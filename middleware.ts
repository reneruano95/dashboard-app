import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

// Add public routes here
const publicRoutes = ["/", "/sign-in", "/sign-up"];
const isPublicRoute = (path: string) => publicRoutes.includes(path);

// Add private routes here
const privateRoutes = ["/dashboard"];
const isPrivateRoute = (path: string) => privateRoutes.includes(path);

export async function middleware(request: NextRequest) {
  const { response, supabase } = await updateSession(request);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const origin = request.headers.get("origin");

  if (forwardedHost && origin && forwardedHost !== origin) {
    return new NextResponse("Header mismatch", { status: 400 });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (isPrivateRoute(request.nextUrl.pathname)) {
    if (error || !user) {
      return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
    }
  }

  if (isPublicRoute(request.nextUrl.pathname)) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
