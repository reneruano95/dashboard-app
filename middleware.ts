import { NextRequest, NextResponse } from "next/server";

import { updateSession } from "./lib/supabase/middleware";
import { getUserRoleFromSession } from "./lib/utils";
import { handleAdminRole, handleAgencyRole } from "./lib/middleware-utils";

export async function middleware(request: NextRequest) {
  const { response, supabase } = await updateSession(request);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  const url = request.nextUrl;
  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = request.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  // console.log("hostname:", hostname);

  const searchParams = url.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;
  // console.log("path:", path);

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    if (!user && path !== "/sign-in" && path !== "/") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (session) {
      const userRole = getUserRoleFromSession(session);

      if (userRole === "admin") {
        return handleAdminRole(path, request);
      }

      if (userRole.startsWith("agency")) {
        return handleAgencyRole(path, user?.id!, supabase, request);
      }
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
