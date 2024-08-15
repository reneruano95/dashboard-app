import { QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";
import { getAgencyByUser } from "@/lib/actions/agencies";
import { Agency } from "@/lib/types";

export default async function DashboardPage() {
  const queryClient = new QueryClient();
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
      queryKey: ["user", user.id],
      queryFn: () =>
        getAgencyByUser({
          userId: user.id,
          supabase,
        }),
    });

    if (!agency) {
      throw new Error("Agency not found");
    }
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
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

  return redirect(`/dashboard/${agency.id}`);
}
