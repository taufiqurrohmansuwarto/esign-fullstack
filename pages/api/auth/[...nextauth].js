import prisma from "lib/prisma";
import NextAuth from "next-auth/next";

const masterClientId = process.env.MASTER_ID;
const masterClientSecret = process.env.MASTER_SECRET;
const masterWellKnown = process.env.MASTER_WELLKNOWN;
const masterScope = process.env.MASTER_SCOPE;

const upsertUser = async (id) => {
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default NextAuth({
  providers: [
    {
      id: "master",
      type: "oauth",
      name: "SIMASTER",
      wellKnown: masterWellKnown,
      clientId: masterClientId,
      clientSecret: masterClientSecret,
      authorization: {
        params: {
          scope: masterScope,
          prompt: "login",
        },
      },
      httpOptions: {
        timeout: 100000,
      },
      checks: ["pkce", "state"],
      profile: async (profile, token) => {
        const currentToken = token?.id_token;
      },
    },
  ],
  secret: process.env.SECRET,
  // callbacks: {
  //   redirect: async ({ url, baseUrl }) => {
  //     const urlCallback = `${url?.baseUrl}${process.env.BASE_PATH}`;
  //     console.log(urlCallback);
  //     return urlCallback;
  //   },
  //   async session({ session, token, user }) {},
  //   async jwt({ token, account, isNewUser, profile, user }) {},
  // },
});
