import { Sidebar } from "@/components/sidebar/sidebar";
import { getQueryClient } from "@/lib/providers/get-query-client";

export default function AgencyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { agency_id: string };
}) {
  const queryClient = getQueryClient();

  return (
    <>
      <Sidebar />
      <main className="flex flex-1 flex-col items-center justify-center h-screen space-y-4 p-8">
        {children}
      </main>
    </>
  );
}
