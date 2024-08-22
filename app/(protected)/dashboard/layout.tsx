import { redirect } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return redirect("/sign-in");
  }

  return <main className="min-h-screen flex">{children}</main>;
}
