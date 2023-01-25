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

    const currentUserInRecipient = await prisma.Recipient.findFirst({
      where: {
        document_id: documentId,
        recipient_id: userId,
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
        signatory_status: "COMPLETED",
        approval_date: new Date(),
        rejected_date: new Date(),
        rejected_reason: req?.body?.reason,
        rejected_id: userId,
      },
    });

    await prisma.Recipient.update({
      where: {
        id: documentId,
      },
      data: {
        status: "REJECTED",
      },
    });

    //   kemudian update document status menjadi REJECTED dan sign_document adalah rejecteddocumenttitle
    await prisma.Document.update({
      where: {
        id: documentId,
      },
      data: {
        status: "REJECTED",
        sign_document: rejectedDocumentTitle,
      },
    });

    //   insert ke tabel history
    await prisma.History.create({
      data: {
        user_id: userId,
        document_id: documetId,
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
