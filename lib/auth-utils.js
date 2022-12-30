import { checkNik } from "services/bsre/bsre.user.service";
import prisma from "./prisma";

// upsert two times?
export const upsertUserAttr = async (id, data) => {
  try {
    const result = await prisma.User.upsert({
      where: {
        id,
      },

      update: {
        ...data,
      },
      create: {
        id,
        ...data,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const upsertTTEStatus = async (id, data) => {
  try {
    const currentUser = await prisma.User.findUnique({
      where: {
        id,
      },
    });
    const nik = currentUser?.nik;
    const checkResultTTE = await checkNik(nik);
  } catch (error) {
    console.log(error);
  }
};
