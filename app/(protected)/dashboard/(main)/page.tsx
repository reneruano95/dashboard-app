import { ModeToggle } from "@/components/global/mode-toggle";
import { SignOutButton } from "@/components/global/sign-out-button";

export default async function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center h-screen">
      <h1 className="text-2xl">Dashboard</h1>
      <p className="text-lg">
        Welcome to the admin dashboard! This is where you can manage all the
        agencies and users in your organization.
      </p>
      <ModeToggle />
      <SignOutButton />
    </div>
  );
}
