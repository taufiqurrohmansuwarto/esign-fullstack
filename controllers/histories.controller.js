const { default: prisma } = require("lib/prisma");

const index = async (req, res) => {
  try {
    const result = await prisma.History.findMany();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  index,
};
