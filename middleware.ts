import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

import { updateSession } from "./lib/supabase/middleware";
import { getAgencyByUser } from "./lib/queries/agencies";
import { Role } from "./lib/types";

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
  console.log("hostname:", hostname);

  const searchParams = url.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;
  console.log("path:", path);

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    if (!user && path !== "/sign-in") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (session) {
      const jwt = jwtDecode(session.access_token);

      // @ts-ignore
      const userRole: Role = jwt.user_role;
      console.log("User role:", userRole);

      if (userRole === "admin") {
        if (!path.startsWith("/dashboard")) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }

      if (userRole === "agency_owner" || userRole === "agency_user") {
        const { id: agencyId } = await getAgencyByUser({
          userId: user?.id!,
          supabase,
        });

        if (path === "/sign-in") {
          return NextResponse.redirect(new URL(`/${agencyId}`, request.url));
        }

        if (path === "/dashboard") {
          return NextResponse.redirect(new URL(`/${agencyId}`, request.url));
        }

        if (!path.startsWith(`/${agencyId}`)) {
          return NextResponse.redirect(new URL(`/${agencyId}`, request.url));
        }
      }
    }
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, request.url)
    );
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
