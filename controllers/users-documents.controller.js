// fuckign documents
const { default: prisma } = require("lib/prisma");

const index = async (req, res) => {
  try {
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 20;
    const search = req?.query?.search || "";
    const type = req?.query?.type || "all";

    const user = req?.user;
    const userId = user?.id;

    // todo : add search, limit, page, type
    const currentQuery = {
      where: {
        recipient_id: userId,
      },
      include: {
        Document: true,
      },
    };

    const result = await prisma.Recipient.findMany(currentQuery);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// delete dapat digunakan untuk menghapus dokumen hanya pada status draft dan dia juga sebagai uploader
const remove = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  index,
  remove,
};
