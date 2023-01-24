const checkSequenceMiddleware = (role) => async (req, res, next) => {
  try {
    const documentId = req?.query?.documentId;
    const user = req?.user;

    const recipients = await prisma.Recipient.findMany({
      where: {
        document_id: documentId,
      },
      orderBy: {
        sequence: "asc",
      },
    });

    // cek first. if the other user with previous signatory_status is not pending then the current user can sign
    const currentUserStatus = recipients?.find(
      (recipient) => recipient?.recipient_id === user?.id
    );

    const previousUserStatus = recipients?.find(
      (recipient) => recipient?.sequence === currentUserStatus?.sequence - 1
    );

    if (currentUserStatus?.role !== role) {
      res.status(400).json({
        code: 400,
        message: "Your role is not allowed edit this document",
      });
    }

    if (previousUserStatus?.signatory_status !== "PENDING") {
      next();
    } else {
      res.status(400).json({
        code: 400,
        message: "Wait for the previous user to sign",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = checkSequenceMiddleware;
