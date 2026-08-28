import { auth } from "@/auth";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  /*
   * Protect admin pages.
   *
   * The Auth.js session must exist.
   */
  if (
    isAdminRoute &&
    !isLoginPage &&
    !req.auth
  ) {
    const loginUrl = new URL(
      "/admin/login",
      req.nextUrl.origin
    );

    loginUrl.searchParams.set(
      "callbackUrl",
      pathname + req.nextUrl.search
    );

    return Response.redirect(loginUrl);
  }

  /*
   * IMPORTANT:
   *
   * We intentionally DO NOT redirect authenticated
   * users away from /admin/login here.
   *
   * The browser-tab session is handled by sessionStorage.
   */
});
  
export const config = {
  matcher: ["/admin/:path*"],
};