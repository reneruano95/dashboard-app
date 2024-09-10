import { TypedSupabaseClient } from "../types";
import { getUserRoleFromSession } from "../utils";

export const getUserRole = async (supabase: TypedSupabaseClient) => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      const errorMessage = error
        ? "Error fetching user role"
        : "Session not found";

      console.error(errorMessage, error);
      throw new Error(errorMessage);
    }

    return getUserRoleFromSession(data.session);
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};
