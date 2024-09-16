"use server";

import { createServerClient } from "../supabase/server";
import { SignIn } from "../types";

export const signInWithPassword = async ({ email, password }: SignIn) => {
  const supabase = createServerClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error during sign in:", err);
    throw err;
  }
};

export const signOut = async () => {
  const supabase = createServerClient();
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
