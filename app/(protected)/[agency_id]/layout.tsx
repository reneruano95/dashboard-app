import { Sidebar } from "@/components/sidebar/sidebar";

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <Sidebar />

        {children}
      </main>
    </>
  );
}
