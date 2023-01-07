const { default: prisma } = require("@/lib/prisma");

// cuman preview menggunakan req query
const previewDocumentController = async (req, res) => {};

// preview tapi status dokumennya
const previewDocumentWithStatusController = async (req, res) => {};

const detailDocument = async (req, res) => {
  try {
    const { documentId } = req?.query;
    const {
      user: { id },
    } = req;

    const recipient = await prisma.Recipient.findFirst({
      where: {
        document_id: documentId,
        recipient_id: id,
      },
    });

    const currentDocument = await prisma.Document.findUnique({
      where: {
        id: documentId,
      },
    });

    if (recipient?.length === 0 || !currentDocument) {
      res.status(404).json({ message: "Document not found" });
    } else {
      res.status(200).json(currentDocument);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  previewDocumentController,
  previewDocumentWithStatusController,
  detailDocument,
};
