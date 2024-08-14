import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

// Add public routes here
const publicRoutes = ["/sign-in", "/sign-up"];
const isPublicRoute = (path: string) => publicRoutes.includes(path);

// Add private routes here
const privateRoutes = ["/dashboard"];
const isPrivateRoute = (path: string) => privateRoutes.includes(path);

export async function middleware(request: NextRequest) {
  const { response, supabase } = await updateSession(request);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const url = request.nextUrl;
  let hostname = request.headers;

  const customDomain = hostname
    .get("host")
    ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0];

  // if (customDomain) {
  //   console.log(customDomain);
  //   // return NextResponse.rewrite(new URL(`/${customDomain}`, request.url));
  // }

  if (isPrivateRoute(url.pathname)) {
    if (error || !user) {
      return NextResponse.redirect(new URL("/sign-in", url));
    }
  }

  if (isPublicRoute(url.pathname)) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", url));
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
