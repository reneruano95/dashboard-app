import { TypedSupabaseClient } from "../types";

export const getUser = async ({
  userId,
  supabase,
}: {
  userId: string;
  supabase: TypedSupabaseClient;
}) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .throwOnError()
    .limit(1)
    .single();

  // console.log(data);

  if (error) throw error;

  if (!data) throw new Error("User not found");

  return data;
};
