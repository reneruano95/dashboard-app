import { ModeToggle } from "@/components/global/mode-toggle";
import { SignOutButton } from "@/components/global/sign-out-button";

export default function AgencyPage({
  params,
}: {
  params: { agencyId: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold text-center text-foreground/90">
        Welcome to the dashboard! of the agency {params.agencyId}
      </h1>
      <p className="text-center text-lg text-foreground/80">
        You are now signed in.
      </p>
      <ModeToggle />
      <SignOutButton />
    </div>
  );
}
