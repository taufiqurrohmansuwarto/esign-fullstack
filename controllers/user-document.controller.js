const { default: prisma } = require("@/lib/prisma");

const { removeDocument, downloadWithFilename } = require("@/lib/utils");

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

    const result = await downloadWithFilename({
      minio: req?.mc,
      filename: document,
      newFilename: currentDocument?.filename,
    });

    let initialDocUrl = null;
    let ongoingDocUrl = null;
    let signDocUrl = null;

    if (currentDocument?.initial_document) {
      initialDocUrl = await downloadWithFilename({
        minio: req?.mc,
        filename: currentDocument?.initial_document,
        newFilename: currentDocument?.filename,
      });
    }

    if (currentDocument?.ongoing_document) {
      ongoingDocUrl = await downloadWithFilename({
        minio: req?.mc,
        filename: currentDocument?.ongoing_document,
        newFilename: `ongoing_${currentDocument?.filename}`,
      });
    }

    if (currentDocument?.sign_document) {
      signDocUrl = await downloadWithFilename({
        minio: req?.mc,
        filename: currentDocument?.sign_document,
        newFilename: `signed_${currentDocument?.filename}`,
      });
    }

    if (recipient?.length === 0 || !currentDocument) {
      res.status(404).json({ message: "Document not found" });
    } else {
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

const deleteDocument = async (req, res) => {
  try {
    const documentId = req?.query?.documentId;
    const userId = req?.user?.id;

    const currentDocument = await prisma.Document.findUnique({
      where: {
        id: documentId,
      },
    });

    if (currentDocument?.user_id !== userId) {
      res.status(403).json({ message: "Forbidden" });
    } else if (!currentDocument) {
      res.status(404).json({ message: "Document not found" });
    } else if (currentDocument?.status !== "DRAFT") {
      res.status(400).json({
        message: "Document can't be deleted. Because documen status not DRAFT",
      });
    } else {
      await removeDocument({
        minio: req?.mc,
        filename: currentDocument?.initial_document,
      });

      const result = await prisma.Document.delete({
        where: {
          id: documentId,
        },
      });

      res.json({
        message: "Document deleted",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

const archiveDocument = async (req, res) => {
  try {
    const documentId = req?.query?.documentId;
    const userId = req?.user?.id;

    const currentDocument = await prisma.Document.findUnique({
      where: {
        id: documentId,
      },
    });

    const recipients = await prisma.Recipient.findMany({
      where: {
        document_id: documentId,
      },
    });

    const checkIfCurrentUserInRecipient = recipients?.find(
      (recipient) => recipient?.recipient_id === userId
    );

    if (!checkIfCurrentUserInRecipient) {
      res.status(403).json({ message: "Forbidden" });
    }

    if (!currentDocument) {
      res.status(404).json({ message: "Document not found" });
    }

    await prisma.Recipient.updateMany({
      where: {
        document_id: documentId,
        recipient_id: userId,
      },
      data: {
        is_archived: true,
      },
    });

    res.json({
      message: "Document archived",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

const searching = async (req, res) => {
  try {
    const { search } = req?.query;
    const { id } = req?.user;

    if (!search) {
      return;
    } else {
      const result = await prisma.Recipient.findMany({
        where: {
          recipient_id: id,
          filename: {
            contains: search,
            mode: "insensitive",
          },
        },
        select: {
          filename: true,
          id: true,
          document_id: true,
        },
        take: 15,
      });

      const serialize = result?.map((item) => ({
        value: item?.document_id,
        label: item?.filename,
      }));

      res.json(serialize);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

module.exports = {
  searching,
  archiveDocument,
  deleteDocument,
  previewDocumentController,
  previewDocumentWithStatusController,
  detailDocument,
  detailInformationDocument,
};
