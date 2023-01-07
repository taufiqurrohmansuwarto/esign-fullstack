const { default: prisma } = require("@/lib/prisma");

const CheckDocumentAllowAccessMiddleware = async (req, res, next) => {
  try {
    const { documentId } = req?.query;

    const currentDocument = await prisma.Document.findUnique({
      where: {
        id: documentId,
      },
    });

    const recipient = await prisma.Recipient.findFirst({
      where: {
        document_id: documentId,
        recipient_id: req.user.id,
      },
    });

    if (recipient?.length === 0 || !currentDocument) {
      res.status(404).json({ message: "Document not found" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = CheckDocumentAllowAccessMiddleware;
