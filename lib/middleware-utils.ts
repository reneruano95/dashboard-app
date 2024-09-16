import { NextRequest, NextResponse } from "next/server";
import { getAgencyByUser } from "./queries/agencies";
import { TypedSupabaseClient } from "./types";

const appsPages = [
  "/apps/to-dos",
  "/apps/kanban",
  "/apps/calendar",
  "/apps/automation",
];

export const redirectTo = (url: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(url, request.url));
};

export const rewriteTo = (url: string | URL, request: NextRequest) => {
  return NextResponse.rewrite(new URL(url, request.url));
};

export const handleAdminRole = (path: string, request: NextRequest) => {
  if (!path.startsWith("/dashboard")) {
    return redirectTo("/dashboard", request);
  }

  if (path.startsWith("/dashboard/apps")) {
    const matchedPage = appsPages.find((page) =>
      path.startsWith(`/dashboard${page}`)
    );

    return rewriteTo(`${matchedPage}`, request);
  }
};

export const handleAgencyRole = async (
  path: string,
  userId: string,
  supabase: TypedSupabaseClient,
  request: NextRequest
) => {
  const { id: agencyId } = await getAgencyByUser({ userId, supabase });

  if (path === "/sign-in" || path === "/dashboard") {
    return redirectTo(`/${agencyId}`, request);
  }

  if (!path.startsWith(`/${agencyId}`)) {
    return redirectTo(`/${agencyId}`, request);
  }

  if (path.startsWith(`/${agencyId}/apps`)) {
    const matchedPage = appsPages.find((page) =>
      path.startsWith(`/${agencyId}${page}`)
    );
    return rewriteTo(matchedPage || `/${agencyId}`, request);
  }
};
