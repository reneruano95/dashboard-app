"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { useAuth } from "@/lib/hooks/use-auth";

export const SignOutButton = () => {
  const router = useRouter();

  const { logout } = useAuth();

  const handleSignOut = async () => {
    await logout.mutateAsync();
    router.push("http://app.localhost:3000");
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
