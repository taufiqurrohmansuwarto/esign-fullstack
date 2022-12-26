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

export const options = {
  callbacks: {
    redirect: async (url, baseUrl) => {
      const urlCallback = `${url?.baseUrl}${process.env.BASE_PATH}`;
      return urlCallback;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.expires = token?.expires;

      // session.scope = token.scope;
      session.user.id = token.id;
      session.user.role = token?.role;
      session.user.group = token?.group;
      session.user.employee_number = token?.employee_number;
      session.user.organization_id = token?.organization_id;
      session.user.name = token?.username;
      session.user.current_role = token?.current_role;

      const check = Date.now() < new Date(token?.expires * 1000);

      if (check) {
        return session;
      }
    },
    async jwt({ token, account, isNewUser, profile, user }) {
      if (account) {
        token.accessToken = account?.access_token;
        token.expires = profile.exp;
        token.username = profile?.name;
        token.id = account?.providerAccountId;
        token.role = profile?.role;
        token.group = profile?.group;
        token.employee_number = profile?.employee_number;
        token.organization_id = profile?.organization_id;
        token.current_role = user?.current_role;
      }

      return token;
    },
  },
  secret: process.env.SECRET,
  providers: [
    {
      id: "master",
      name: "Master",
      wellknown: masterWellKnown,
      type: "oauth",
      version: "2.0",
      scope: masterScope,
      clientId: masterClientId,
      clientSecret: masterClientSecret,
      idToken: true,
      checks: ["pkce", "state"],
      authorization: {
        params: {
          scope: masterScope,
          prompt: "login",
        },
      },
    },
  ],
};

export default NextAuth(options);
