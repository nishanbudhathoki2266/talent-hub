import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const isLoggedIn = Boolean(request.cookies?.get("isLoggedIn")?.value);

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["//:path*", "/profile/:path"],
};
