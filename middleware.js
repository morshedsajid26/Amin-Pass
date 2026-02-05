import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  /* ================= COOKIES ================= */
  const businessToken = request.cookies.get("accessToken")?.value;
const systemToken = request.cookies.get("accessToken")?.value;
  const staffToken = request.cookies.get("token")?.value;        // staff login token
  const staffStage = request.cookies.get("staffStage")?.value;  // PIN stage

  /* ======================================================
     BUSINESS OWNER
  ====================================================== */
  if (pathname.startsWith("/businessowner")) {
    const publicRoutes = [
      "/businessowner/signin",
      "/businessowner/forgotpassword",
      "/businessowner/otp",
      "/businessowner/newpassword",
    ];

    const isPublic = publicRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isPublic) {
      if (businessToken) {
        return NextResponse.redirect(
          new URL("/businessowner/home", request.url)
        );
      }
      return NextResponse.next();
    }

    if (!accessToken) {
      return NextResponse.redirect(
        new URL("/businessowner/signin", request.url)
      );
    }
  }

  /* ======================================================
     SYSTEM OWNER
  ====================================================== */
  if (pathname.startsWith("/systemowner")) {
    const publicRoutes = [
      "/systemowner/signin",
      "/systemowner/forgotpassword",
      "/systemowner/otp",
      "/systemowner/newpassword",
    ];

    const isPublic = publicRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isPublic) {
      if (systemToken) {
        return NextResponse.redirect(
          new URL("/systemowner/home", request.url)
        );
      }
      return NextResponse.next();
    }

    if (!accessToken) {
      return NextResponse.redirect(
        new URL("/systemowner/signin", request.url)
      );
    }
  }

  /* ======================================================
     STAFF (FULL FIX)
  ====================================================== */
  if (pathname.startsWith("/staff")) {
    const publicRoutes = [
      "/staff/signin",     // email + password
      "/staff/login",      // PIN login
      "/staff/forgotpin",
      "/staff/otp",
      "/staff/newpin",
    ];

    const pinSetupRoutes = [
      "/staff/platform/settings",
      // "/staff/customer/platform/settings",
    ];

    const isPublic = publicRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const isPinSetupRoute = pinSetupRoutes.some((route) =>
      pathname.startsWith(route)
    );

    /* ❌ Not signed in */
    if (!staffToken && !isPublic) {
      return NextResponse.redirect(
        new URL("/staff/signin", request.url)
      );
    }

    /* ✅ Signed in BUT PIN NOT VERIFIED */
    if (staffToken && staffStage !== "PIN_VERIFIED") {
      // allow only PIN related pages
      if (
        !pathname.startsWith("/staff/login") &&
        !isPinSetupRoute &&
        !pathname.startsWith("/staff/otp") &&
        !pathname.startsWith("/staff/newpin")
      ) {
        return NextResponse.redirect(
          new URL("/staff/login", request.url)
        );
      }
    }

    /* ✅ Fully authenticated staff */
    if (
      staffToken &&
      staffStage === "PIN_VERIFIED" &&
      isPublic
    ) {
      return NextResponse.redirect(
        new URL("/staff/customer/platform", request.url)
      );
    }
  }

  return NextResponse.next();
}

/* ================= MATCHER ================= */
export const config = {
  matcher: [
    "/businessowner/:path*",
    "/systemowner/:path*",
    "/staff/:path*",
  ],
};
