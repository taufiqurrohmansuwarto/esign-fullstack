const { default: prisma } = require("@/lib/prisma");

const { downloadFile } = require("@/lib/utils");

// cuman preview menggunakan req query
const previewDocumentController = async (req, res) => {};

// preview tapi status dokumennya
const previewDocumentWithStatusController = async (req, res) => {};

// without document url
const detailInformationDocument = async (req, res) => {
  try {
    const { documentId } = req?.query;
    const result = await prisma.Document.findUnique({
      where: {
        id: documentId,
      },
      select: {
        id: true,
        workflow: true,
        filename: true,
        status: true,
        created_at: true,
        size: true,
        document_pages: true,
        Recipient: {
          select: {
            sign_properties: true,
          },
          where: {
            recipient_id: req?.user?.id,
            signatory_status: "COMPLETED",
            role: "signer",
          },
        },
        uploader: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

    if (status === "DRAFT" || status === "draft") {
      document = currentDocument?.initial_document;
    } else if (
      status === "COMPLETED" ||
      status === "completed" ||
      status === "REJECTED" ||
      status === "rejected"
    ) {
      document = currentDocument?.sign_document;
    } else if (status === "ONGOING" || status === "ongoing") {
      document = currentDocument?.ongoing_document;
    }

    const result = await downloadFile({
      minio: req?.mc,
      filename: document,
    });

    let initialDocUrl = null;
    let ongoingDocUrl = null;
    let signDocUrl = null;

    if (currentDocument?.initial_document) {
      initialDocUrl = await downloadFile({
        minio: req?.mc,
        filename: currentDocument?.initial_document,
      });
    }

    if (currentDocument?.ongoing_document) {
      ongoingDocUrl = await downloadFile({
        minio: req?.mc,
        filename: currentDocument?.ongoing_document,
      });
    }

    if (currentDocument?.sign_document) {
      signDocUrl = await downloadFile({
        minio: req?.mc,
        filename: currentDocument?.sign_document,
      });
    }

    //  now create history
    await prisma.History.create({
      data: {
        document_id: documentId,
        user_id: id,
        action: "OPENED",
        ip_address: req?.ip,
        useragent: req?.useragent,
        type: "DOCUMENT",
        created_at: new Date(),
      },
    });

    if (recipient?.length === 0 || !currentDocument) {
      res.status(404).json({ message: "Document not found" });
    } else {
      res.status(200).json({
        ...currentDocument,
        document_url: result,
        urls: {
          initialDocUrl,
          ongoingDocUrl,
          signDocUrl,
        },
      });
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
  detailInformationDocument,
};
