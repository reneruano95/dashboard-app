import { TypedSupabaseClient } from "../types";

export const getAgencyByUser = async ({
  userId,
  supabase,
}: {
  userId: string;
  supabase: TypedSupabaseClient;
}) => {
  const { data, error } = await supabase
    .from("users")
    .select("agencies!inner(*)")
    .eq("id", userId)
    .throwOnError()
    .limit(1)
    .single();

  // console.log(data);

  if (error) throw error;

  if (!data.agencies) throw new Error("Agency not found");

  return data.agencies;
};
