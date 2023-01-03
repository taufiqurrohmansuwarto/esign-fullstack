import { getBiodataWithHeaders } from "@/services/gateway.service";
import prisma from "./prisma";

// upsert two times?
export const upsertUserAttr = async (id, data, accessToken) => {
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

    // penggunaan ini menimbulkan downside yaitu login pada user akan sangat lambat dan mengikuti dari response api, tapi kalau ga diginikan setiap kali mereka membuka di client akan memakan waktu

    const { employee_number, group, role } = result;
    const employeeJson = await getBiodataWithHeaders(
      accessToken,
      employee_number
    );

    // kalau dia user dari master maka update data user_info
    const userMaster = group === "MASTER" && role === "USER";

    if (userMaster) {
      await prisma.User.update({
        where: {
          id,
        },
        data: {
          user_info: employeeJson,
        },
      });
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};
