import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const sessionCookie = req.cookies.has("session");

  if (!sessionCookie) {
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|__next|favicon.ico|_static|ajax).*)"],
};
