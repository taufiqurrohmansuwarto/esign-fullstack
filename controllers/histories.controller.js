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

    const result = await prisma.History.findMany({
      where,
      include: {
        user: true,
        document: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
    });

    res
      .status(200)
      .json({ page: parseInt(page), limit: parseInt(limit), result });
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

module.exports = {
  index,
  update,
  create,
  remove,
  detail,
};
