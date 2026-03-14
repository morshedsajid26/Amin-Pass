import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  /* ================= COOKIES ================= */
  const businessToken = request.cookies.get("accessToken")?.value;
const systemToken = request.cookies.get("accessToken")?.value;
  const staffToken = request.cookies.get("token")?.value;             // Final staff PIN token
  const staffSignInToken = request.cookies.get("SignInToken")?.value; // Initial staff login token

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

    if (!businessToken) {
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

    if (!systemToken) {
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
      "/staff/forgotpin",
      "/staff/otp",
      "/staff/newpin",
    ];

    const pinSetupRoutes = [
      "/staff/platform/settings",
    ];

    const isPublic = publicRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const isPinSetupRoute = pinSetupRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const isPinLoginRoute = pathname.startsWith("/staff/login");

    /* ❌ Not signed in at all (no tokens) */
    if (!staffToken && !staffSignInToken && !isPublic && !isPinLoginRoute) {
      return NextResponse.redirect(
        new URL("/staff/signin", request.url)
      );
    }

    /* ✅ Only SignInToken present (Needs PIN Login or Setup) */
    if (staffSignInToken && !staffToken) {
      if (!isPinLoginRoute && !isPinSetupRoute && !isPublic) {
        return NextResponse.redirect(
          new URL("/staff/login", request.url)
        );
      }
    }

    /* ✅ Fully authenticated staff (Has PIN token) */
    if (staffToken && (isPublic || isPinLoginRoute || isPinSetupRoute)) {
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
