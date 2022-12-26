// fucking CRUD we need document id

const { default: prisma } = require("lib/prisma");

const index = async (req, res) => {
  try {
    const { documentId } = req?.query;

    const discussions = await prisma.Discussions.findMany({
      where: {
        document_id: documentId,
      },
    });

    res.status(200).json(discussions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
  } catch (error) {}
};

const update = async (req, res) => {
  try {
    const { documentId, discussionId } = req?.query;
    const { body } = req;

    await prisma.Discussions.updateMany({
      where: {
        id: discussionId,
        document_id: documentId,
      },
      data: {
        body,
      },
    });

    res.status(200).json({
      message: "Discussion updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const remove = async (req, res) => {
  try {
    const { documentId, discussionId } = req?.query;

    await prisma.Discussions.deleteMany({
      where: {
        id: discussionId,
        document_id: documentId,
      },
    });

    res.status(200).json({
      message: "Discussion deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const detail = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  index,
  create,
  update,
  remove,
  detail,
};
