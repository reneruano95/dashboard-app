import { Sidebar } from "@/components/sidebar/sidebar";

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex items-center justify-center h-full">
        <Sidebar />
        <div className="flex-1 h-full overflow-y-auto pt-[48px]">
          {children}
        </div>
      </main>
    </>
  );
}
