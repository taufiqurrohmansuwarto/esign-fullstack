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
    let currentQuery = {
      where: {
        recipient_id: userId,
      },
      orderBy: {
        created_at: "desc",
      },
    };

    if (type === "draft") {
      currentQuery = {
        ...currentQuery,
        where: {
          ...currentQuery.where,
          role: "owner",
          status: "DRAFT",
        },
      };
    }

    if (type === "pending") {
      currentQuery = {
        ...currentQuery,
        where: {
          ...currentQuery.where,
          signatory_status: "PENDING",
        },
      };
    }

    if (type === "done") {
      currentQuery = {
        ...currentQuery,
        where: {
          ...currentQuery.where,
          signatory_status: "COMPLETED",
        },
      };
    }

    if (type === "archived") {
      currentQuery = {
        ...currentQuery,
        where: {
          ...currentQuery.where,
          is_archived: true,
        },
      };
    }

    if (type === "rejected") {
      currentQuery = {
        ...currentQuery,
        where: {
          ...currentQuery.where,
          signatory_status: "REJECTED",
        },
      };
    }

    const withInclude = {
      include: {
        document: {
          include: {
            Recipient: true,
          },
        },
      },
    };

    if (search) {
      currentQuery = {
        ...currentQuery,
        where: {
          ...currentQuery.where,
          document: {
            filename: {
              contains: search,
            },
          },
        },
      };
    }

    const [total, results] = await prisma.$transaction([
      prisma.Recipient.count({ ...currentQuery }),
      prisma.Recipient.findMany({
        ...currentQuery,
        ...withInclude,
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
      }),
    ]);

    const data = {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      results,
    };

    res.json(data);
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
