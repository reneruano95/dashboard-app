"use client";

import { Button } from "../ui/button";
import { useAuth } from "@/lib/hooks/auth/use-auth-actions";
import { Icon } from "./icon";

export const SignOutButton = () => {
  const { logout } = useAuth();

  const handleSignOut = async () => {
    return await logout.mutateAsync();
  };

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      className="hover:bg-transparent hover:text-destructive w-full flex items-center justify-start p-0 h-fit"
      onClick={handleSignOut}
    >
      <Icon name="LogOut" className="mr-2 h-4 w-4" />
      <span>Sign Out</span>
    </Button>
  );
};
