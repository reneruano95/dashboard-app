import { UserResponse } from "@supabase/supabase-js";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { createBrowserClient } from "../supabase/client";

export const useAuthUser = () => {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createBrowserClient();

      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        await supabase.auth.signOut({
          scope: "local",
        });
      }

      return data.user;
    },
    enabled: false,
    staleTime: 0,
  });

  return user;
};
