import NextAuth from "next-auth/next";

const masterClientId = process.env.MASTER_ID;
const masterClientSecret = process.env.MASTER_SECRET;
const masterWellKnown = process.env.MASTER_WELLKNOWN;
const masterScope = process.env.MASTER_SCOPE;

export default NextAuth({
  pages: {
    signIn: "/esign/signin",
  },
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
    },
  ],
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      const urlCallback = `${url?.baseUrl}${process.env.BASE_PATH}`;
      return urlCallback;
    },
    async session({ session, token, user }) {},
    async jwt({ token, account, isNewUser, profile, user }) {},
  },
  theme: "light",
  logger: {},
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
