"use client";
import { signUpWithEmail } from "@/lib/server-actions/auth";
import { Button } from "../ui/button";
import { SignInValues } from "@/lib/types";

export const SignUpButton = ({ email, password }: SignInValues) => {
  const onClick = async () => {
    const { error } = await signUpWithEmail({ email, password });

    if (error) {
      console.error("Failed to sign up");
    }
  };

  return (
    <Button onClick={onClick} className="w-full">
      Sign Up
    </Button>
  );
};
