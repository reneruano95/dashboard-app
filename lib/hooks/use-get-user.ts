import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUser } from "../queries/users";
import { createBrowserClient } from "../supabase/client";
import { AgencyUser } from "../types";

export const useGetUser: (
  id: string
) => UseQueryResult<AgencyUser | null, Error> = (id: string) => {
  return useQuery<AgencyUser>({
    queryKey: ["user", id],
    queryFn: async () =>
      await getUser({
        userId: id,
        supabase: createBrowserClient(),
      }),
    //The query will not execute until the userId exists
    enabled: !!id,
  });
};
