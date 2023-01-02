const { default: prisma } = require("lib/prisma");
const { createStamp } = require("lib/utils");

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

    const { employee_number, golongan, pangkat } = result;

    const hasil = await fetcher.get(`/master/pegawai/${employee_number}`);
    const employeeData = hasil?.data;

    const currentData = {
      nama: employeeData?.nama,
      nip: employeeData?.nip,
      golonganPangkat: `${employeeData?.golongan}-${employeeData?.pangkat}`,
    };

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
};
