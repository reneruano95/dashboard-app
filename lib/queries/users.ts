"use server";

import { verifySession } from "../actions/dal";
import { createServerClient } from "../supabase/server";

export const getUser = async () => {
  const supabase = createServerClient();

  const session = await verifySession(supabase);
  if (!session) return null;

  try {
    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.userId)
      .throwOnError()
      .limit(1)
      .single();

    if (error || !userData) {
      console.error("Error fetching user data:", error);
      throw new Error("Error fetching user data");
    }

    return userData;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
};
