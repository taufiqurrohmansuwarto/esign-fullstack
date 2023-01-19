const { default: prisma } = require("@/lib/prisma");

const index = async (req, res) => {
  // create paging
  const page = req?.query?.page || 1;
  const limit = req?.query?.limit || 20;
  const type = req?.query?.type || "all";

  try {
    const {
      user: { id },
    } = req;

    let where = {
      user_id: id,
    };

    if (type === "all") {
      where = {
        ...where,
      };
    } else if (type === "DOCUMENT") {
      where = {
        ...where,
        type: "DOCUMENT",
      };
    } else if (type === "ACTION") {
      where = {
        ...where,
        type: "ACTION",
      };
    }

    const query = {
      where,
      include: {
        user: true,
        document: true,
      },
      orderBy: {
        created_at: "desc",
      },
    };

    const [count, result] = await prisma.$transaction([
      prisma.History.count({
        where,
      }),
      prisma.History.findMany({
        ...query,
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
      }),
    ]);

    const data = {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      result,
    };

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const update = async (req, res) => {};

const create = async (req, res) => {
  try {
  } catch (error) {}
};

const remove = async (req, res) => {};

const detail = async (req, res) => {};

const historyByDocument = async (req, res) => {
  try {
    const { documentId } = req?.query;
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 5;

    const query = {
      where: {
        document_id: documentId,
      },
      select: {
        id: true,
        created_at: true,
        action: true,
        document: {
          select: {
            user_id: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
    };

    const result = await prisma.History.findMany(query);

    res.json({ page: parseInt(page), limit: parseInt(limit), result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  historyByDocument,
  index,
  update,
  create,
  remove,
  detail,
};
