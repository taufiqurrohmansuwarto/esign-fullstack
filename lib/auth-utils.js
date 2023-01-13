import {
  getBiodataWithHeaders,
  getBiodataWithHeadersPTTPK,
} from "@/services/gateway.service";
import prisma from "./prisma";

// upsert two times?
export const upsertUserAttr = async (id, data, accessToken, ip, useragent) => {
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

    const { employee_number, group, role } = result;
    // kalau dia user dari master maka update data user_info
    const userMaster = group === "MASTER" && role === "USER";
    const userPttpk = group === "PTTPK" && role === "USER";

    // penggunaan ini menimbulkan downside yaitu login pada user akan sangat lambat dan mengikuti dari response api, tapi kalau ga diginikan setiap kali mereka membuka di client akan memakan waktu
    if (userMaster) {
      const employeeJson = await getBiodataWithHeaders(
        accessToken,
        employee_number
      );
      await prisma.User.update({
        where: {
          id,
        },
        data: {
          user_info: employeeJson,
        },
      });
    }

    if (userPttpk) {
      const employeeJson = await getBiodataWithHeadersPTTPK(
        accessToken,
        employee_number
      );
      await prisma.User.update({
        where: {
          id,
        },
        data: {
          user_info: employeeJson,
        },
      });
    }

    await prisma.History.create({
      data: {
        user_id: id,
        ip_address: ip,
        action: "LOGIN",
        type: "ACCOUNT",
        created_at: new Date(),
        useragent,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};
