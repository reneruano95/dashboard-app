import { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createBrowserClient } from "../../supabase/client";
import { SignIn } from "../../types";
import { getQueryClient } from "@/components/providers/get-query-client";
import { getAgencyByUser } from "../../queries/agencies";
import { getUserRoleFromSession } from "../../utils";
import { queriesKeys } from "@/lib/queries-keys";

export const useAuthActions = () => {
  const router = useRouter();

  const supabase = useMemo(() => createBrowserClient(), []);
  const queryClient = useMemo(() => getQueryClient(), []);

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
      queryClient.setQueryData([queriesKeys.user], data.user);

      const session = data.session;
      if (session) {
        const userRole = getUserRoleFromSession(session);

        queryClient.setQueryData([queriesKeys.role], userRole);

        if (userRole === "admin") {
          return router.replace("/dashboard");
        }

        if (userRole === "agency_user" || userRole === "agency_owner") {
          const agency = await queryClient.fetchQuery({
            queryKey: [queriesKeys.agency],
            queryFn: async () =>
              await getAgencyByUser({
                userId: data.user.id,
                supabase,
              }),
          });

          queryClient.setQueryData([queriesKeys.agency, agency.id], agency);

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
        console.error("Error logging out:", error);
        throw new Error("Error logging out");
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

  return { signIn, logout };
};
