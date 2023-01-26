const { default: prisma } = require("@/lib/prisma");
const { uploadFile } = require("@/lib/utils");

const insertDatabaseRejectedMiddleware = async (req, res, next) => {
  try {
    const documentId = req.query?.documentId;
    const userId = req?.user?.id;

    const { rejectedDocumentTitle, rejectedDocumentBuffer } =
      req?.rejectedDocument;

    //   upload file buffer ke minio
    await uploadFile({
      minio: req.mc,
      filename: rejectedDocumentTitle,
      fileBuffer: rejectedDocumentBuffer,
    });

    const currentUserInRecipient = await prisma.Recipient.updateMany({
      where: {
        document_id: documentId,
        recipient_id: userId,
      },
      data: {
        signatory_status: "REJECTED",
        approval_date: new Date(),
        is_done: true,
      },
    });

    //   update signatory status menjadi REJECTED di semua document_id di tabel recipient dan rejected_id adalah dari user dan juga rejected_reason dan juga rejected_date dan approval_date
    await prisma.Recipient.updateMany({
      where: {
        document_id: documentId,
        sequence: {
          gte: currentUserInRecipient.sequence,
        },
      },
      data: {
        signatory_status: "REJECTED",
        status: "REJECTED",
        approval_date: new Date(),
      },
    });

    await prisma.Recipient.updateMany({
      where: {
        document_id: documentId,
      },
      data: {
        status: "REJECTED",
        signatory_status: "REJECTED",
        rejected_at: new Date(),
        rejected_reason: "I dont want to review this document",
        rejected_id: userId,
      },
    });

    //   kemudian update document status menjadi REJECTED dan sign_document adalah rejecteddocumenttitle
    await prisma.Document.update({
      where: {
        id: documentId,
      },
      data: {
        status: "REJECTED",
        ongoing_document: rejectedDocumentTitle,
        sign_document: rejectedDocumentTitle,
        rejected_id: userId,
        rejected_at: new Date(),
        rejected_reason: "I dont want to review this document",
      },
    });

    //   insert ke tabel history
    await prisma.History.create({
      data: {
        user_id: userId,
        document_id: documentId,
        action: "REJECTED",
        type: "DOCUMENT",
        ip_address: req?.ip,
        useragent: req?.useragent,
      },
    });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = insertDatabaseRejectedMiddleware;
