"use client";

import { signOut } from "@/lib/server-actions/auth";
import { Button } from "../ui/button";

export const SignOutButton = () => {
  return (
    <Button
      variant={"secondary"}
      size={"sm"}
      className="hover:bg-gray-200"
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  );
};
