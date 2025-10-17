export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/blogs/:path*", "/admin/products/:path*"],
};

