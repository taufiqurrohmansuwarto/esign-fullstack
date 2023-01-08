const index = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
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
