import { useMutation, useQuery } from "@tanstack/react-query";

import { createBrowserClient } from "../supabase/client";
import { SignIn } from "../types";

export const useAuth = () => {
  const supabase = createBrowserClient();

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
    mutationKey: ["user", "sign-in"],
    onError: (error) => {
      console.error("Error signing in:", error);
    },
    onSuccess: (data) => {
      console.log("Signed in:", data.email);
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
