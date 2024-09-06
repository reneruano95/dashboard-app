import { useCallback, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

import { createBrowserClient } from "../../supabase/client";
import { Role, SignIn } from "../../types";
import { getQueryClient } from "@/components/providers/get-query-client";
import { getAgencyByUser } from "../../queries/agencies";
import { getUserRoleFromSession, handleError } from "../../utils";

export const useAuth = () => {
  const router = useRouter();

  const supabase = useMemo(() => createBrowserClient(), []);
  const queryClient = useMemo(() => getQueryClient(), []);

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
    staleTime: 0,
    refetchOnMount: false,
    select: useCallback((data: User) => data, []),
  });

  const signIn = useMutation({
    mutationFn: async ({ email, password }: SignIn) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Error signing in:", error);
          throw new Error("Sign in failed");
        }

        return data;
      } catch (err) {
        console.error("Error during sign in:", err);
        throw err;
      }
    },
    mutationKey: ["signIn"],
    onError: (error) => {
      console.error("Error signing in:", error);
    },

    onSuccess: async (data) => {
      queryClient.setQueryData(["user"], data.user);

      const session = data.session;
      if (session) {
        const userRole = getUserRoleFromSession(session);

        queryClient.setQueryData(["role"], userRole);

        if (userRole === "admin") {
          return router.replace("/dashboard");
        }

        if (userRole === "agency_user" || userRole === "agency_owner") {
          const agency = await queryClient.fetchQuery({
            queryKey: ["agency"],
            queryFn: async () =>
              await getAgencyByUser({
                userId: data.user.id,
                supabase,
              }),
          });

          queryClient.setQueryData(["agency", agency.id], agency);

          if (!agency) {
            throw new Error("Agency not found");
          }

          if (agency.id) {
            return router.replace(`/${agency.id}`);
          }
        }
      }
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut({ scope: "local" });

      if (error) {
        handleError(error as Error);
      }
    },
    onError: (error) => {
      console.error("Error logging out:", error);
    },
    onSuccess: () => {
      queryClient.clear();
      router.replace("/sign-in");
      toast.success("You have been signed out");
    },
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
    enabled: false,
    staleTime: 0,
    refetchOnMount: false,
    select: useCallback((data: Role) => data, []),
  });

  return { user, signIn, logout, userRole };
};
