const { default: prisma } = require("@/lib/prisma");
const { uploadFile } = require("@/lib/utils");

const rejectReviewMiddleware = async (req, res, next) => {
  try {
    const documentId = req?.query?.documentId;
    const user = req?.user;

    const rejectedDocument = req?.rejectedDocument;

    const { rejectedDocumentTitle, rejectedDocumentBuffer } = rejectedDocument;

    await uploadFile({
      minio: req.mc,
      filename: rejectedDocumentTitle,
      fileBuffer: rejectedDocumentBuffer,
    });

    next();
    // upload file buffer ke minio
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = rejectReviewMiddleware;
