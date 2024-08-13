export default function DashboarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen flex">{children}</main>;
}
