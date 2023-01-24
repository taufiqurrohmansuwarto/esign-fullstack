const { default: prisma } = require("@/lib/prisma");
const { uploadFile } = require("@/lib/utils");

const inserDatabaseMiddleware = async (req, res, next) => {
  try {
    const { filename } = req?.documentStamp;
    const documentSign = req?.documentSign;

    const userId = req?.user?.id;
    const documetId = req?.query?.documentId;

    await uploadFile({
      minio: req.mc,
      filename,
      fileBuffer: documentSign,
    });

    // check recipient pada document yang sedang di sign
    const recipients = await prisma.Recipient.findMany({
      where: {
        document_id: documetId,
      },
    });

    const currentUserRecipient = recipients.find(
      (recipient) => recipient.recipient_id === userId
    );

    await prisma.Document.update({
      where: {
        id: documetId,
      },
      data: {
        ongoing_document: filename,
      },
    });

    await prisma.Recipient.update({
      where: {
        id: currentUserRecipient?.id,
      },
      data: {
        signatory_status: "COMPLETED",
        approval_date: new Date(),
      },
    });

    // cek kalau user sekarang adalah user terakhir maka update status document menjadi COMPLETED
    if (currentUserRecipient?.sequence === recipients.length - 1) {
      await prisma.Document.update({
        where: {
          id: documetId,
        },
        data: {
          status: "COMPLETED",
          sign_document: `${filename}`,
        },
      });

      await prisma.Recipient.updateMany({
        where: {
          document_id: documetId,
        },
        data: {
          status: "COMPLETED",
        },
      });
    }

    await prisma.History.create({
      data: {
        user_id: userId,
        document_id: documetId,
        action: "SIGN",
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

module.exports = inserDatabaseMiddleware;
