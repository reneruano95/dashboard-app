"use server";
import { Profile, SignIn } from "../types";
import { createAdminAuthClient } from "../supabase/admin";

export const createUser = async ({ email, password }: SignIn) => {
  const supabase = createAdminAuthClient();

  const newUser: Partial<Profile> = {
    username: email.split("@")[0],
    full_name: "Rene Ruano",
    avatar_url: "https://api.dicebear.com/9.x/pixel-art/svg",
    status: "ACTIVE",
  };

  try {
    supabase.auth.admin
      .createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          ...newUser,
          app_name: "dashboard-app",
        },
      })
      .then((response) => {
        console.log(response);
      });
  } catch (error) {
    throw error;
  }
};
