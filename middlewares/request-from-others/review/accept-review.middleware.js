const { default: prisma } = require("@/lib/prisma");

const acceptReviewMiddleware = async (req, res, next) => {
  try {
    const documentId = req?.query?.documentId;
    const user = req?.user;

    const currentDocument = await prisma.Document.findUnique({
      where: {
        id: documentId,
      },
    });

    const currentUrlDocument = currentDocument?.ongoing_document;

    const recipients = await prisma.Recipient.findMany({
      where: {
        document_id: documentId,
      },
      orderBy: {
        sequence: "asc",
      },
    });

    const currentUserStatus = recipients?.find(
      (recipient) => recipient?.recipient_id === user?.id
    );

    // if currentuserstatus sequence is the last sequence then update status document to COMPLETED
    if (currentUserStatus?.sequence === recipients.length - 1) {
      // update recipient status to COMPLETED
      await prisma.Recipient.updateMany({
        where: {
          document_id: documentId,
        },
        data: {
          status: "COMPLETED",
        },
      });

      // update document status to COMPLETED
      await prisma.Document.update({
        where: {
          id: documentId,
        },
        data: {
          status: "COMPLETED",
          sign_document: `${currentUrlDocument}`,
        },
      });
    } else {
      await prisma.Recipient.updateMany({
        where: {
          document_id: documentId,
          recipient_id: user?.id,
        },
        data: {
          signatory_status: "COMPLETED",
          reason: "I APPROVE THIS DOCUMENT",
          approval_date: new Date(),
          is_done: true,
        },
      });
    }

    await prisma.History.create({
      data: {
        document_id: documentId,
        user_id: user?.id,
        action: "REVIEWED",
        created_at: new Date(),
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

module.exports = acceptReviewMiddleware;
