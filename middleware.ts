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
  const searchParams = url.searchParams.toString();

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;
  console.log("path:", path);

  const pathArray = path.split("/").filter((p) => p !== "");
  console.log("pathArray:", pathArray);

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let customHostname = hostname
    .get("host")!
    .replace("localhost:3000", `.${process.env.NEXT_PUBLIC_CUSTOM_DOMAIN}`);

  console.log("customHostname:", customHostname);

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
