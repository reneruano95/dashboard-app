import { TypedSupabaseClient } from "../types";
import { getUserRoleFromSession } from "../utils";

export const getUserRole = async (supabase: TypedSupabaseClient) => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      throw error;
    }

    const userRole = getUserRoleFromSession(data.session);

    return userRole;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};
