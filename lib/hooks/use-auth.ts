import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

import { createBrowserClient } from "../supabase/client";
import { Role, SignIn } from "../types";
import { getQueryClient } from "@/components/providers/get-query-client";
import { getAgencyByUser } from "../queries/agencies";

export const useAuth = () => {
  const router = useRouter();
  const supabase = createBrowserClient();
  const queryClient = getQueryClient();

  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        console.error("User not found. Signing out.");

        await supabase.auth.signOut({
          scope: "local",
        });
        throw new Error("User not found");
      }

      return data.user;
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

      return data;
    },
    mutationKey: ["user", "session"],

    onError: (error) => {
      console.error("Error signing in:", error);
    },

    onSuccess: async (data) => {
      queryClient.setQueryData(["user", "session"], data);
      user.refetch();

      const session = data.session;
      if (session) {
        const jwt = jwtDecode(session.access_token);

        // @ts-ignore
        const userRole: Role = jwt.user_role;
        console.log("User role:", userRole);

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
        throw new Error(error.message);
      }
    },
    mutationKey: ["session", "logout", "user"],
    onError: (error) => {
      console.error("Error logging out:", error);
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success("You have been signed out");
      router.replace("/sign-in");
    },
  });

  const userRole = useQuery({
    queryKey: ["user", "role"],
    queryFn: async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        throw new Error(error.message);
      }

      if (!session) {
        throw new Error("Session not found");
      }
      const jwt = jwtDecode(session?.access_token);

      // @ts-ignore
      const userRole: Role = jwt.user_role;
      // console.log("User role:", userRole);

      return userRole;
    },
    enabled: false,
    staleTime: 0,
  });

  return { user, signIn, logout, userRole };
};
