"use server";

import { createServerClient } from "../supabase/server";

export const getUserDetails = async (userId: string) => {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .throwOnError()
    .single();

  if (error) throw error;

  if (!data) throw new Error("User not found");

  return data;
};
