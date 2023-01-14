// fucking CRUD we need document id

const { default: prisma } = require("lib/prisma");

const index = async (req, res) => {
  try {
    const { documentId } = req?.query;

    const discussions = await prisma.Discussion.findMany({
      where: {
        document_id: documentId,
      },
      include: {
        user: {
          select: {
            id: true,
            user_info: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
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
    const { documentId } = req?.query;
    const { body } = req;

    const data = {
      message: body.message,
      document_id: documentId,
      user_id: req.user.id,
    };

    await prisma.Discussion.create({
      data,
    });

    res.json({
      message: "Discussion created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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

    await prisma.Discussion.deleteMany({
      where: {
        id: discussionId,
        document_id: documentId,
        user_id: req.user.id,
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
