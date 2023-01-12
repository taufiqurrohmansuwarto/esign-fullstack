const { default: prisma } = require("@/lib/prisma");

const createHistories = (histories) => {
  return async (req, res, next) => {
    try {
      const {
        user: { id },
        ip,
      } = req;

      const data = {
        user_id: id,
        ip_address: ip,
        ...histories,
      };

      await prisma.History.create({
        data,
      });

      next();
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports = createHistories;
