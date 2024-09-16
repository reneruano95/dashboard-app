import { cache } from "react";
import { redirect } from "next/navigation";
import { TypedSupabaseClient } from "../types";

// Data Access Layer(DAL)
export const verifySession = cache(async (supabase: TypedSupabaseClient) => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      redirect("/sign-in");
    }

    return {
      isAuthenticated: !!user,
      userId: user?.id,
    };
  } catch (error) {
    console.error("Error verifying session:", error);
    throw error;
  }
});
