import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { createBrowserClient } from "../../supabase/client";
import { Role, User } from "../../types";
import { queriesKeys } from "@/lib/queries-keys";
import { getUserRole } from "@/lib/queries/roles";
import { getUser } from "@/lib/queries/users";

export const useUser = () => {
  const pathname = usePathname();
  const supabase = useMemo(() => createBrowserClient(), []);

  const user = useQuery<User | null>({
    queryKey: [queriesKeys.user],
    queryFn: async () => await getUser(),
    enabled: !!supabase.auth.getSession() && pathname !== "/sign-in",
    staleTime: Infinity,
    select: useCallback((data: User | null) => data, []),
  });

  const userRole = useQuery<Role>({
    queryKey: [queriesKeys.role],
    queryFn: async () => await getUserRole(supabase),
    enabled: !!user.data,
    staleTime: Infinity,
    select: useCallback((data: Role) => data, []),
  });

  return { user, userRole };
};
