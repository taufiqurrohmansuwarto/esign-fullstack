const { default: prisma } = require("@/lib/prisma");

const listConfirmation = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const result = await prisma.findMany({
      where: {
        to_requester_id: userId,
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const acceptConfirmation = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const documentCollectiveId = req?.query?.documentCollectiveId;
    await prisma.DocumentCollectiveRequest.updateMany({
      where: {
        id: documentCollectiveId,
        to_requester_id: userId,
      },
      data: {
        status: "ACCEPTED",
        reason: "I accept this request",
      },
    });
    res.json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const rejectConfirmation = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const documentCollectiveId = req?.query?.documentCollectiveId;
    await prisma.DocumentCollectiveRequest.updateMany({
      where: {
        id: documentCollectiveId,
        to_requester_id: userId,
      },
      data: {
        status: "REJECTED",
        reason: "I reject this request",
      },
    });
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  listConfirmation,
  acceptConfirmation,
  rejectConfirmation,
};
