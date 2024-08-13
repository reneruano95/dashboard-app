import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { useGetUser } from "@/lib/hooks/useGetUser";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserDetails } from "@/lib/actions/users";

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

  const userDetails = await queryClient.fetchQuery({
    queryKey: ["user", user.id],
    queryFn: () => getUserDetails(user.id),
    
  });

  if (!userDetails) {
    return redirect("/sign-in");
  }

  return redirect(`/dashboard/${userDetails.agency_id}`);
}
