import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getQueryClient } from "@/components/providers/get-query-client";
import { queriesKeys } from "@/lib/queries-keys";
import { getAgencyByUser } from "@/lib/queries/agencies";
import { createBrowserClient } from "@/lib/supabase/client";
import { getUserRoleFromSession } from "@/lib/utils";
import { SignIn } from "@/lib/types";
import { getUser } from "@/lib/queries/users";
import { signInWithPassword, signOut } from "@/lib/actions/auth";

export const useAuthActions = () => {
  const router = useRouter();
  const supabase = useMemo(() => createBrowserClient(), []);
  const queryClient = useMemo(() => getQueryClient(), []);

  const signIn = useMutation({
    mutationFn: async ({ email, password }: SignIn) =>
      await signInWithPassword({ email, password }),
    mutationKey: ["signIn"],
    onSuccess: async (data) => {
      const session = data.session;

      const userRole = getUserRoleFromSession(session);
      queryClient.setQueryData([queriesKeys.role], userRole);

      const user = await queryClient.fetchQuery({
        queryKey: [queriesKeys.user],
        queryFn: async () => await getUser(),
      });
      queryClient.setQueryData([queriesKeys.user], user);

      if (userRole === "admin") {
        return router.replace("/dashboard");
      }

      if (userRole.startsWith("agency")) {
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

        return router.replace(`/${agency.id}`);
      }
    },
  });

  const logout = useMutation({
    mutationFn: async () => await signOut(),
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
