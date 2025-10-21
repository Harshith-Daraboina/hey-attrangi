import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access if user has a valid token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/blogs/:path*", "/admin/products/:path*", "/admin/resources/:path*"],
};

