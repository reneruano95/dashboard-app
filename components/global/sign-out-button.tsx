"use client";

import { Button } from "../ui/button";
import { useAuth } from "@/lib/hooks/use-auth";

export const SignOutButton = () => {
  const { logout } = useAuth();

  const handleSignOut = async () => {
    return await logout.mutateAsync();
  };

  return (
    <Button
      variant={"secondary"}
      size={"sm"}
      className="hover:bg-gray-200"
      onClick={handleSignOut}
    >
      Sign out
    </Button>
  );
};
