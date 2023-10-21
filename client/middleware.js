import { NextResponse } from "next/server";

export function middleware(request) {
  const currentUser = request.cookies.has("currentUser");

  if (!currentUser) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: "/profile/:path*",
};
