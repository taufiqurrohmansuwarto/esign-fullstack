const { default: prisma } = require("lib/prisma");

const index = async (req, res) => {
  try {
    const { user } = req;
    const { id } = user;
    const currentUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    const data = {
      userInfo: {},
      document: {},
    };

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  index,
};
