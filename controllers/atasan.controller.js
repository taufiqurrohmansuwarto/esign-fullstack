// mendapatkan atsan berdasarkan id_skpd di user_info hal ini digunakan untuk menampilkan eselon 3 dan eselon 2 di setiap bidang / perangkat daerah masing-masing

const { default: prisma } = require("@/lib/prisma");
import { serializeStamp } from "@/lib/client-utils";
const { createStamp } = require("lib/utils");
import { biodataPegawaiAtasan } from "@/services/gateway.service";

const stamp = async (data) => {
  const currentResult = serializeStamp(data);
  const resultBuffer = await createStamp(currentResult);
  const base64Image = resultBuffer.toString("base64");

  return {
    ...data,
    image: base64Image,
  };
};

const getAtasanController = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const currentUser = await prisma.User.findUnique({
      where: {
        id: userId,
      },
    });

    const { user_info } = currentUser;
    const { skpd_id } = user_info;

    const atasanSkpdId = skpd_id?.slice(0, 3);

    let promises = [];

    promises.push(biodataPegawaiAtasan(req?.fetcher, skpd_id));
    promises.push(biodataPegawaiAtasan(req?.fetcher, atasanSkpdId));

    const result = await Promise.allSettled(promises);

    const hasil = result.map((item) => {
      if (item.status === "fulfilled") {
        return stamp(item.value);
      }
    });

    const upsertAtasan = result?.map((item) => {
      if (item.status === "fulfilled") {
        return prisma.User.upsert({
          where: {
            id: `MASTER|${item.value?.pegawai_id}`,
          },
          update: {
            user_info: item?.value,
            username: item?.value?.nama,
            employee_number: item?.value?.nip,
            nik: item?.value?.nik,
            image: item?.value?.fileDiri?.foto,
            group: `MASTER`,
            role: "USER",
          },
          create: {
            id: `MASTER|${item.value?.pegawai_id}`,
            user_info: item?.value,
            username: item?.value?.nama,
            employee_number: item?.value?.nip,
            nik: item?.value?.nik,
            image: item?.value?.fileDiri?.foto,
            group: `MASTER`,
            role: "USER",
          },
        });
      }
    });

    await Promise.all(upsertAtasan);

    let promiseStamp = [];

    hasil.forEach((item) => {
      if (item) {
        promiseStamp.push(item);
      }
    });

    const resultStamp = await Promise.allSettled(promiseStamp);

    const hasilStampAtasan = resultStamp.map((item) => {
      if (item.status === "fulfilled") {
        return item.value;
      }
    });

    res.json(hasilStampAtasan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAtasanController,
};
