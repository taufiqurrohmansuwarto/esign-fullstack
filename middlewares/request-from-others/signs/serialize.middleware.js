const { default: prisma } = require("@/lib/prisma");
const { downloadFile } = require("@/lib/utils");
import axios from "axios";

const serializeMiddleware = async (req, res, next) => {
  try {
    const documentId = req?.query?.documentId;
    const userId = req?.user?.id;
    const body = req?.body;

    const result = await prisma.Recipient.findFirst({
      where: {
        document_id: documentId,
        recipient_id: userId,
        role: "SIGNER",
        signatory_status: "PENDING",
      },
    });

    const currentUser = await prisma.User.findUnique({
      where: {
        id: userId,
      },
    });

    if (!result) {
      res.status(404).json({
        code: 404,
        message:
          "Document not found or you are not the signer of this document",
      });
    } else {
      const currentDocument = await prisma.Document.findUnique({
        where: {
          id: documentId,
        },
      });

      const url = await downloadFile({
        minio: req?.mc,
        filename: currentDocument?.ongoing_document,
      });

      const documentBuffer = await axios.get(url, {
        responseType: "arraybuffer",
      });

      const data = {
        properties: result?.sign_properties,
        filename: currentDocument?.ongoing_document,
        passphrase: body?.passphrase,
        fileBuffer: documentBuffer?.data,
        nik: currentUser?.user_info?.nik,
      };

      req.document = data;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = serializeMiddleware;
