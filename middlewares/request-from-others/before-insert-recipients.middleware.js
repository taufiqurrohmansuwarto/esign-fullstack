// middleware untuk menambahkan recipients pada workflow request from others
// cek dulu status document nya draft atau di recipient ketika rolenya adalah owner cek dulu status nya harus draft

const { default: prisma } = require("@/lib/prisma");

module.exports.beforeInsertMiddleware = async (req, res, next) => {
  try {
    const { documentId } = req?.query;
    const { user } = req;

    const document = await prisma.Document.findUnique({
      where: {
        id: documentId,
      },
    });

    const recipient = await prisma.Recipient.findMany({
      where: {
        document_id: documentId,
        recipient_id: user?.id,
        status: "DRAFT",
        role: "owner",
        is_owner: true,
      },
    });

    if (!recipient?.length) {
      res.status(404).json({
        code: 404,
        message: "document not found or you are not the owner of this document",
      });
    } else if (document?.workflow !== "requestFromOthers") {
      res.status(400).json({
        code: 400,
        message: "Only requestFromOthers workflow can add recipients",
      });
    } else {
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
