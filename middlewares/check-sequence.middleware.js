const { default: prisma } = require("@/lib/prisma");

// create create conditions based on sequence on recipients table. if sequence is 1, then no check. if sequence is after 1, then check previous sequence is signed or reviewed by checking signatory_status column on recipients table if its true or false. Check until sequence length is equal to sequence number.
const checkSequenceMiddleware = async (req, res, next) => {
  try {
    const { documentId } = req?.query;
    const {
      user: { id },
    } = req;

    const recipients = await prisma.Recipient.findMany({
      where: {
        document_id: documentId,
      },
    });

    // masalah : ketika ada 1 orang dengan 2 role yang berbeda ambil yang paling atas terlebih dahulu sesuai uruatan sequencenya
    const currentUser = await prisma.Recipient.findFirst({
      where: {
        document_id: documentId,
        recipient_id: id,
      },
      orderBy: {
        sequence: "asc",
      },
    });

    // check current user sequence if its 1, then no check. if its more than 1, then check previous sequence is signed or reviewed by checking signatory_status column on recipients table if its true or false. Check until sequence length is equal to sequence number.
    if (currentUser.sequence === 1) {
      return next();
    }

    if (currentUser.sequence > 1) {
      const previousSequence = currentUser.sequence - 1;
      const previousSequenceStatus = await prisma.Recipient.findFirst({
        where: {
          document_id: documentId,
          sequence: previousSequence,
        },
      });

      if (previousSequenceStatus.signatory_status === "COMPLETED") {
        next();
      } else {
        res.status(403).json({
          code: 403,
          message:
            "Cant sign or review document. Because previous sequence is not completed",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = checkSequenceMiddleware;
