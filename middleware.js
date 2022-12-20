import { withAuth } from "next-auth/middleware";

// This is the middleware that will be used for all pages
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      console.log("yeah");
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.userRole === "admin";
      }
      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});

export const config = { matcher: ["/admin", "/me"] };
