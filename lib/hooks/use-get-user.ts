import { useQuery } from "@tanstack/react-query";
import { getUser } from "../queries/users";
import { createBrowserClient } from "../supabase/client";

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () =>
      await getUser({
        userId: id,
        supabase: createBrowserClient(),
      }),
    //The query will not execute until the userId exists
    enabled: !!id,
  });
};
