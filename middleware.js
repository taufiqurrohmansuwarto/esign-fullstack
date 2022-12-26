import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req?.nextUrl?.pathname === "/admin") {
        return token?.userRole === "admin";
      }

      //   cek kalau selalu ada token
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/admin", "/testing"],
};
