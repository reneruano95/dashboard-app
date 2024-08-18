import { AuthTokenResponsePassword, UserResponse } from "@supabase/supabase-js";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

import { createBrowserClient } from "../supabase/client";
import { SignIn } from "../types";

export const useAuth = () => {
  const user = useQuery({
    queryKey: ["user", "session"],
    queryFn: async () => {
      const supabase = createBrowserClient();

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
      const supabase = createBrowserClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error as Error;
      }

      return data;
    },
    mutationKey: ["user", "sign-in"],
    onError: (error) => {
      console.error("Error signing in:", error);
    },
    onSuccess: (data) => {
      console.log("Signed in:", data.user.email);
    },
  });

  return { user, signIn };
};
