const { biodataPegawai } = require("@/services/gateway.service");
const { default: prisma } = require("lib/prisma");
const { createStamp } = require("lib/utils");

const serializeAttr = (data) => {
  return {
    nip: data?.nip || data?.niptt,
    nama: data?.nama,
    golongan: data?.golongan,
    pangkat: data?.pangkat,
    golonganPangkat: `${data?.golongan}-${data?.pangkat}`,
  };
};

const index = async (req, res) => {
  try {
    // nip golongan pangkat
    const { user } = req;
    const { id } = user;

    const result = await prisma.User.findUnique({
      where: {
        id,
      },
    });

    const { user_info } = result;
    const currentData = serializeAttr(user_info);
    const resultBuffer = await createStamp(currentData);
    const base64Image = resultBuffer.toString("base64");
    const data = { userInfo: user_info, image: base64Image };

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

// function ini digunakan untuk mencari data berdasarkan nip, kemudian dijadikan stempel
const get = async (req, res) => {
  try {
    const { employeeNumber } = req?.query;
    const { fetcher } = req;
    const employee = await biodataPegawai(fetcher, employeeNumber);

    // if empty object
    if (Object.keys(employee).length === 0) {
      res.json(null);
    } else {
      const currentData = serializeAttr(employee);
      const resultBuffer = await createStamp(currentData);
      const base64Image = resultBuffer.toString("base64");
      res.json({ userInfo: employee, image: base64Image });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  index,
  get,
};
