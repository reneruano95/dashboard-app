import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";

import { createBrowserClient } from "../../supabase/client";
import { Role } from "../../types";
import { getUserRoleFromSession, handleError } from "../../utils";

export const useUser = () => {
  const supabase = useMemo(() => createBrowserClient(), []);

  const user = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
          console.error("User not found. Signing out.");
          await supabase.auth.signOut({ scope: "local" });
          throw new Error("User not found");
        }

        return data.user;
      } catch (err) {
        console.error("Error fetching user:", err);
        throw err;
      }
    },
    enabled: false,
    staleTime: Infinity,
    refetchOnMount: false,
    select: useCallback((data: User) => data, []),
  });

  const userRole = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          handleError(error as Error);
        }

        if (!data.session) {
          throw new Error("Session not found");
        }

        return getUserRoleFromSession(data.session);
      } catch (error) {
        console.error("Error fetching user role:", error);
        throw error;
      }
    },
    enabled: !!user.data,
    staleTime: Infinity,
    refetchOnMount: false,
    select: useCallback((data: Role) => data, []),
  });

  return { user, userRole };
};
