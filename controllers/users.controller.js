const { default: prisma } = require("@/lib/prisma");
const { checkNik } = require("services/bsre/bsre.user.service");

const index = async (req, res) => {
  try {
    const { user } = req;
    const { nik } = user;

    const { id } = user;

    const currentUser = await prisma.User.findUnique({
      where: {
        id,
      },
    });

    const currentCheckNik = await checkNik(nik);
    const resultCheckNik = currentCheckNik?.data;

    const currentUserResult = {
      ...currentUser?.user_info,
      ...resultCheckNik,
    };

    res.status(200).json(currentUserResult);
  } catch (error) {
    console.log(error);
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
