const { default: prisma } = require("@/lib/prisma");
const { checkNik } = require("@/services/bsre/bsre.user.service");

const checkNikMiddleware = async (req, res, next) => {
  try {
    const {
      user: { id },
    } = req;

    const result = await prisma.User.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      res.status(404).json({
        code: 404,
        message: "User not found",
      });
    } else {
      // cek user kalau dia punya ktp
      const nik = result?.nik;

      if (!nik) {
        res.status(404).json({
          code: 404,
          message: "The identity Number of this user not found",
        });
      } else {
        const result = await checkNik(nik);

        if (result?.data?.status_code === 1110) {
          res.status(404).json({
            code: 404,
            message:
              "Your identity Number not registered. Please register first",
          });
        } else {
          next();
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Internal Server Error",
    });
  }
};

module.exports = checkNikMiddleware;
