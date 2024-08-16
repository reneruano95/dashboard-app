import { Sidebar } from "@/components/sidebar/sidebar";

export default function AgencyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { agency_id: string };
}) {
  return (
    <>
      <Sidebar />
      <main className="flex flex-1 flex-col items-center justify-center h-screen space-y-4 p-8">
        {children}
      </main>
    </>
  );
}
