import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { createBrowserClient } from "../supabase/client";
import { SignIn } from "../types";
import { getQueryClient } from "@/components/providers/get-query-client";
import { getAgencyByUser } from "../queries/agencies";

export const useAuth = () => {
  const router = useRouter();
  const supabase = createBrowserClient();
  const queryClient = getQueryClient();

  const user = useQuery({
    queryKey: ["user", "session"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        console.error("User not found. Signing out.");
        await supabase.auth.signOut({
          scope: "local",
        });
      }

      return data;
    },
    enabled: false,
    staleTime: 0,
  });

  const signIn = useMutation({
    mutationFn: async ({ email, password }: SignIn) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error as Error;
      }

      return data.user;
    },
    mutationKey: ["user", "session"],
    onError: (error) => {
      console.error("Error signing in:", error);
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(["user", "session"], data);
      user.refetch();

      const agency = await queryClient.fetchQuery({
        queryKey: ["agency"],
        queryFn: async () =>
          await getAgencyByUser({
            userId: data.id,
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
    },
  });

  const logout = useQuery({
    queryKey: ["session", "logout"],
    queryFn: async () => {
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

  return { user, signIn, logout };
};
