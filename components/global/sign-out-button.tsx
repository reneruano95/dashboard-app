"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { useAuthLogout } from "@/lib/hooks/useAuthLogout";

export const SignOutButton = () => {
  const router = useRouter();

  const logout = useAuthLogout();

  const handleSignOut = async () => {
    await logout.refetch();
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
