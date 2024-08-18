import { useQuery } from "@tanstack/react-query";

import type { DefinedUseQueryResult } from "@tanstack/react-query";
import type { AuthError } from "@supabase/supabase-js";
import { useAuthUser } from "./useAuthUser";
import { createBrowserClient } from "../supabase/client";

export const useAuthLogout: () => DefinedUseQueryResult<
  {
    error: AuthError | null;
  } | null,
  Error
> = () => {
  const user = useAuthUser();
  const logout = useQuery<{
    error: AuthError | null;
  } | null>({
    queryKey: ["session", "logout"],
    queryFn: async () => {
      const supabase = createBrowserClient();

      const locData = await supabase.auth.signOut({ scope: "local" });

      await user.refetch();

      if (locData.error) {
        throw new Error(locData.error.message);
      }

      return locData;
    },
    enabled: false,
    staleTime: 0,
    initialData: null,
  });

  return logout;
};
