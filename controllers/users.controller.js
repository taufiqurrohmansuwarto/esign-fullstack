const { default: prisma } = require("../lib/prisma");

const index = async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {};
const remove = async (req, res) => {};
const create = async (req, res) => {};

module.exports = {
  index,
  update,
  remove,
  create,
};
