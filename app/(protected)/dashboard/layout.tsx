import { redirect, RedirectType } from "next/navigation";

import { getQueryClient } from "@/components/providers/get-query-client";
import { createServerClient } from "@/lib/supabase/server";
import { Agency } from "@/lib/types";
import { getAgencyByUser } from "@/lib/queries/agencies";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  const supabase = createServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return redirect("/sign-in");
  }

  let agency: Agency | null = null;
  try {
    agency = await queryClient.fetchQuery({
      queryKey: ["agency"],
      queryFn: async () =>
        await getAgencyByUser({
          userId: user.id,
          supabase,
        }),
    });

    if (!agency) {
      throw new Error("Agency not found");
    }

    queryClient.setQueryData(["agency", agency.id], agency);
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      console.error("Error fetching agency:", error);
      errorMessage = error.message;
    }

    return (
      <>
        <div className="h-screen flex flex-1 flex-col justify-center items-center">
          <h1 className="text-2xl">
            An error occurred. Please try again later.
          </h1>
          <div className="text-destructive">Error: {errorMessage}</div>
          <p>Please contact support for further assistance.</p>
        </div>
      </>
    );
  }

  if (agency.id) {
    return redirect(`/${agency.id}`, RedirectType.replace);
  }

  return <main className="min-h-screen flex">{children}</main>;
}
