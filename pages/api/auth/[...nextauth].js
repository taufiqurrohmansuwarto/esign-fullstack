import { upsertUserAttr } from "lib/auth-utils";
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
      session.user.nik = token?.nik;
      session.user.current_role = token?.current_role;

      const check = Date.now() < new Date(token?.expires * 1000);

      if (check) {
        return session;
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account?.access_token;
        token.expires = profile?.exp;
        token.username = profile?.name;
        token.id = account?.providerAccountId;
        token.role = profile?.role;
        token.group = profile?.group;
        token.employee_number = profile?.employee_number;
        token.organization_id = profile?.organization_id;
        token.current_role = user?.current_role;
        token.nik = user?.nik;
      }
      return token;
    },
  },
  secret: process.env.NEXAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    {
      name: "SIMASTER",
      id: "esign",
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
      profile: async (profile) => {
        const currentUser = {
          id: profile?.sub,
          email: profile?.email,
          nik: profile?.nik,
          username: profile?.name,
          group: profile?.group,
          role: profile?.role,
          organization_id: profile?.organization_id,
          image: profile?.picture,
          employee_number: profile?.employee_number,
        };

        await upsertUserAttr(currentUser.id, currentUser);
        return currentUser;
      },
    },
  ],
});
