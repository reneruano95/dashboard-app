export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold text-center text-foreground/90">
        Welcome to the dashboard!
      </h1>
      <p className="text-center text-lg text-foreground/80">
        You are now signed in.
      </p>
    </div>
  );
}
