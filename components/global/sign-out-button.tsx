"use client";

import { useRouter } from "next/navigation";

import { signOut } from "@/lib/actions/auth";
import { Button } from "../ui/button";

export const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
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
