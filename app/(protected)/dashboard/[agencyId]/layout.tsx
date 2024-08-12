export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-4">
      {children}
    </main>
  );
}
