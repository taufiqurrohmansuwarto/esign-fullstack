import NextAuth from "next-auth/next";

const masterClientId = process.env.MASTER_ID;
const masterClientSecret = process.env.MASTER_SECRET;
const masterWellKnown = process.env.MASTER_WELLKNOWN;
const masterScope = process.env.MASTER_SCOPE;

export default NextAuth({
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
      httpOptions: {
        timeout: 40000,
      },
      idToken: true,
      checks: ["pkce", "state"],
      profile: async (profile) => {
        return profile;
      },
    },
  ],
});
