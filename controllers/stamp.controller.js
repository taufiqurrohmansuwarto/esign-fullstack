const { default: prisma } = require("lib/prisma");

const index = async (req, res) => {
  try {
    // nip golongan pangkat
    const { user } = req;
    const { id } = user;

    const result = await prisma.User.findUnique({
      id,
    });

    const { employeeNumber, golongan, pangkat } = result;

    const empty = !employeeNumber || !golongan || !pangkat;

    if (empty) {
      res
        .status(400)
        .json({ code: 400, message: "NIP/Golongan/Pangkat tidak diisi" });
    } else {
      // create barcode
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  index,
};
