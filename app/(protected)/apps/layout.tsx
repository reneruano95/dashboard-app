import { redirect } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/sidebar/sidebar";

export default async function AppsLayout({
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

  return (
    <main className="flex items-center justify-center h-full">
      <Sidebar />
      <div className="flex-1 h-full overflow-y-auto pt-[48px]">{children}</div>
    </main>
  );
}
