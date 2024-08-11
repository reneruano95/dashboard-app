"use server";

import { AuthError } from "@supabase/supabase-js";
import { createServerClient } from "../supabase/server";
import { parseStringify } from "../utils";
import { Tables } from "../types/database.types";

export const getUserDetails = async (userId: string) => {
  const supabase = createServerClient();

  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", userId)
      .single();

    if (error) {
      return {
        data: null,
        error: parseStringify(error) as AuthError,
      };
    }

    return {
      data: parseStringify(data) as Tables<"users">,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: parseStringify(error) as AuthError,
    };
  }
};
