const { default: prisma } = require("@/lib/prisma");
const { downloadFile } = require("@/lib/utils");
import axios from "axios";

const rejectReviewSerialize = async (req, res, next) => {
  try {
    const documentId = req?.query?.documentId;
    const user = req?.user;

    // check the role of the user in recipient table
    const currentRecipient = await prisma.Recipient.findFirst({
      where: {
        document_id: documentId,
        recipient_id: user?.id,
        role: "REVIEWER",
        signatory_status: "PENDING",
      },
    });

    if (!currentRecipient) {
      res.status(400).json({
        code: 400,
        message: "Your role is not allowed edit this document",
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
        filename: currentDocument?.ongoing_document,
        fileBuffer: documentBuffer?.data,
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

module.exports = rejectReviewSerialize;
