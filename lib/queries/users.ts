import { TypedSupabaseClient } from "../types";

export const getUser = async (supabase: TypedSupabaseClient) => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not found. Signing out.");
      await supabase.auth.signOut({ scope: "local" });
      throw new Error("User not found");
    }

    const { data: userData, error: userDataError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .throwOnError()
      .limit(1)
      .single();

    if (userDataError || !userData) {
      console.error("Error fetching user data:", userDataError);
      throw new Error("Error fetching user data");
    }

    return userData;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
};
