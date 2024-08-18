import { ModeToggle } from "@/components/global/mode-toggle";
import { SignOutButton } from "@/components/global/sign-out-button";

export default function AgencyPage({
  params,
}: {
  params: { agency_id: string };
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold text-center text-foreground/90">
        Welcome to the dashboard! of the agency {params.agency_id}
      </h1>
      <p className="text-center text-lg text-foreground/80">
        You are now signed in.
      </p>
      <ModeToggle />
      <SignOutButton />
    </div>
  );
}
