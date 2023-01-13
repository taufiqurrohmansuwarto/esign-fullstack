const { default: prisma } = require("@/lib/prisma");

const { downloadFile } = require("@/lib/utils");

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
      include: {
        Recipient: true,
      },
    });

    const status = currentDocument?.status;
    let document;

    if (status === "draft") {
      document = currentDocument?.initial_document;
    } else if (status === "completed") {
      document = currentDocument?.sing_document;
    } else if (status === "ongoing") {
      document = currentDocument?.ongoing_document;
    }

    const result = await downloadFile({
      minio: req?.mc,
      filename: document,
    });

    //  now create history
    await prisma.History.create({
      data: {
        document_id: documentId,
        user_id: id,
        action: "opened",
        ip_address: req?.ip,
        useragent: req?.useragent,
        type: "document",
        created_at: new Date(),
      },
    });

    if (recipient?.length === 0 || !currentDocument) {
      res.status(404).json({ message: "Document not found" });
    } else {
      res.status(200).json({ ...currentDocument, document_url: result });
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
