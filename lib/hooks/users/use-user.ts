import { use, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { createBrowserClient } from "../../supabase/client";
import { Role, User } from "../../types";
import { queriesKeys } from "@/lib/queries-keys";
import { getUserRole } from "@/lib/queries/roles";
import { getUser } from "@/lib/queries/users";

export const useUser = () => {
  const supabase = useMemo(() => createBrowserClient(), []);

  const isActiveSession = useMemo(
    () => !!supabase.auth.getSession().then((session) => !!session.data),
    [supabase]
  );

  const user = useQuery<User | null>({
    queryKey: [queriesKeys.user],
    queryFn: async () => await getUser(),
    enabled: isActiveSession,
    staleTime: Infinity,
    refetchOnMount: false,
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
