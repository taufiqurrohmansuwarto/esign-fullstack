import NextAuth from "next-auth/next";

const masterClientId = process.env.MASTER_ID;
const masterClientSecret = process.env.MASTER_SECRET;
const masterWellKnown = process.env.MASTER_WELLKNOWN;
const masterScope = process.env.MASTER_SCOPE;

export default NextAuth({
  callbacks: {
    redirect: async (url, baseUrl) => {
      const urlCallback = `${url?.baseUrl}${process.env.BASE_PATH}`;
      return urlCallback;
    },
  },
  secret: process.env.NEXAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    {
      name: "SIMASTER",
      id: "master",
      type: "oauth",
      wellKnown: masterWellKnown,
      clientId: masterClientId,
      clientSecret: masterClientSecret,
      authorization: {
        params: {
          scope: masterScope,
          prompt: "login",
        },
      },
      idToken: true,
      checks: ["pkce", "state"],
    },
  ],
});
