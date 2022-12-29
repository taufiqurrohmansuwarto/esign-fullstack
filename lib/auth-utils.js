import prisma from "./prisma";

export const upsertUserAttr = async (id, data) => {
  try {
    const result = await prisma.User().upsert({
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
