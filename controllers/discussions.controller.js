const index = async (req, res) => {
  try {
    const { documentId } = req?.query;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const detail = async (req, res) => {
  try {
  } catch (error) {}
};

const remove = async (req, res) => {
  try {
  } catch (error) {}
};

const update = async (req, res) => {
  try {
  } catch (error) {}
};

const create = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  index,
  detail,
  remove,
  update,
  create,
};
