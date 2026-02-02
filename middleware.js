import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // tokens
  const accessToken = request.cookies.get("accessToken")?.value;
  const staffToken = request.cookies.get("token")?.value;

  /* ---------------- BUSINESS OWNER ---------------- */
  if (pathname.startsWith("/businessowner")) {
    // allow unauth pages under businessowner and redirect authenticated users away
    if (
      pathname.startsWith("/businessowner/signin") ||
      pathname.startsWith("/businessowner/forgotpassword") ||
      pathname.startsWith("/businessowner/otp") ||
      pathname.startsWith("/businessowner/newpassword")
    ) {
      if (accessToken) return NextResponse.redirect(new URL("/businessowner/home", request.url));
      return NextResponse.next();
    }

    if (!accessToken) {
      return NextResponse.redirect(new URL("/businessowner/signin", request.url));
    }
  }

  /* ---------------- SYSTEM OWNER ---------------- */
  if (pathname.startsWith("/systemowner")) {
    if (
      pathname.startsWith("/systemowner/signin") ||
      pathname.startsWith("/systemowner/forgotpassword") ||
      pathname.startsWith("/systemowner/otp") ||
      pathname.startsWith("/systemowner/newpassword")
    ) {
      if (accessToken) return NextResponse.redirect(new URL("/systemowner/home", request.url));
      return NextResponse.next();
    }

    if (!accessToken) {
      return NextResponse.redirect(new URL("/systemowner/signin", request.url));
    }
  }

  /* ---------------- STAFF ---------------- */
  if (pathname.startsWith("/staff")) {
    if (
      pathname.startsWith("/staff/login") ||
      pathname.startsWith("/staff/signin") ||
      pathname.startsWith("/staff/forgotpin") ||
      pathname.startsWith("/staff/otp") ||
      pathname.startsWith("/staff/newpin")
    ) {
      if (staffToken) return NextResponse.redirect(new URL("/staff/home", request.url));
      return NextResponse.next();
    }

    if (!staffToken) {
      return NextResponse.redirect(new URL("/staff/login", request.url));
    }
  }

  return NextResponse.next();
}

/* ---------------- MATCHER ---------------- */
export const config = {
  matcher: [
    "/businessowner/:path*",
    "/systemowner/:path*",
    "/staff/:path*",
  ],
};
