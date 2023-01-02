const { biodataPegawai } = require("@/services/gateway.service");
const { default: prisma } = require("lib/prisma");
const { createStamp } = require("lib/utils");

const serializeAttr = (data) => {
  return {
    nip: data?.nip,
    nama: data?.nama,
    golongan: data?.golongan,
    pangkat: data?.pangkat,
    golonganPangkat: `${data?.golongan}-${data?.pangkat}`,
  };
};

const index = async (req, res) => {
  try {
    // nip golongan pangkat
    const { user, fetcher } = req;
    const { id } = user;

    const result = await prisma.User.findUnique({
      where: {
        id,
      },
    });

    const { employee_number } = result;
    const employee = await biodataPegawai(fetcher, employee_number);
    const currentData = serializeAttr(employee);

    const resultBuffer = await createStamp(currentData);
    const base64Image = resultBuffer.toString("base64");

    res.json({ base64Image });
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
    const currentData = serializeAttr(employee);
    const resultBuffer = await createStamp(currentData);
    const base64Image = resultBuffer.toString("base64");
    res.json({ base64Image });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  index,
  get,
};
