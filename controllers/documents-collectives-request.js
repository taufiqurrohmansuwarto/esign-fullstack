const { default: prisma } = require("@/lib/prisma");

const index = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const lastId = req?.query?.lastId;
    const search = req?.query?.search;

    let query = {
      where: {
        from_requester_id: userId,
      },
      include: {
        to_requester: true,
      },
    };

    if (search) {
      query = {
        ...query,
        where: {
          ...query.where,
          filename: {
            contains: search,
            mode: "insensitive",
          },
        },
      };
    }

    if (lastId) {
      query = {
        ...query,
        take: 20,
        skip: 1,
        cursor: {
          id: lastId,
        },
      };
    }

    const result = await prisma.DocumentCollectiveRequest.findMany(query);

    const lastResult = result?.[result?.length - 1];
    const lastIdResult = lastResult?.id;

    res.json({
      data: result,
      lastId: lastIdResult,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const remove = async (req, res) => {
  try {
    const id = req?.query?.documentCollectiveId;
    const userId = req?.user?.id;

    await prisma.DocumentCollectiveRequest.deleteMany({
      where: {
        id,
        from_requester_id: userId,
        status: "PENDING",
      },
    });

    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const create = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const body = req?.body;

    await prisma.DocumentCollectiveRequest.create({
      data: {
        ...body,
        status: "PENDING",
        from_requester_id: userId,
      },
    });

    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const show = async (req, res) => {
  try {
    const id = req?.query?.id;
    const userId = req?.user?.id;

    const result = await prisma.DocumentCollectiveRequest.findMany({
      where: {
        id,
        from_requester_id: userId,
      },
      include: {
        to_requester: true,
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  index,
  update,
  remove,
  create,
  show,
};
