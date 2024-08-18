import { UserResponse } from "@supabase/supabase-js";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { createBrowserClient } from "../supabase/client";

export const useAuthUser: () => UseQueryResult<
  UserResponse | null,
  Error
> = () => {
  const user = useQuery<UserResponse>({
    queryKey: ["user", "session"],
    queryFn: async () => {
      const supabase = createBrowserClient();

      const response = await supabase.auth.getUser();

      if (response.error || !response.data.user) {
        await supabase.auth.signOut({
          scope: "local",
        });
      }

      return response;
    },
    enabled: false,
    staleTime: 0,
  });

  return user;
};
