import { QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";
import { getUserDetails } from "@/lib/actions/users";
import { AgencyUser } from "@/lib/types";

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

  let userDetails: AgencyUser | null = null;
  try {
    userDetails = await queryClient.fetchQuery({
      queryKey: ["user", user.id],
      queryFn: () => getUserDetails(user.id),
    });
  } catch (error) {
    console.error(error);
  }

  if (!userDetails) {
    return (
      <div className="h-screen flex flex-1 flex-col justify-center items-center">
        <h1 className="text-2xl">
          An error occurred while fetching user details.
        </h1>
        <p className="text-lg text-foreground/80">
          Please contact support for further assistance.
        </p>
      </div>
    );
  }

  return redirect(`/dashboard/${userDetails.agency_id}`);
}
