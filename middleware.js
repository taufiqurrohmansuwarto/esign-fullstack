import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized({ req, token }) {
      console.log(token);
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/testing"],
};
