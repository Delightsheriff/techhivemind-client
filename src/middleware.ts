import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public and protected paths
  const publicPaths = ["/auth/signin", "/auth/signup"];
  const protectedPaths = ["/account", "/orders", "/vendor"];

  const isPublicPath = publicPaths.some((pub) => path.startsWith(pub));
  const isProtectedPath = protectedPaths.some((protect) =>
    path.startsWith(protect)
  );

  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Redirect authenticated users away from public paths (login, register, etc.)
    if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/account", request.url));
    }

    // Protect authenticated routes
    if (!token && isProtectedPath) {
      const loginUrl = new URL("/auth/signin", request.url);
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }

    // Check for token errors
    if (token?.error === "RefreshAccessTokenError") {
      // Handle expired sessions by redirecting to login
      const loginUrl = new URL("/auth/signin", request.url);
      loginUrl.searchParams.set("error", "SessionExpired");
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }
}

export const config = {
  matcher: [
    "/auth/signup",
    "/auth/signin",
    "/account/:path*",
    "/orders/:path*",
    "/vendor/:path*",
  ],
};
