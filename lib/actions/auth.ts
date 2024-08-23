"use server";

import { AuthError, User } from "@supabase/supabase-js";

import { createServerClient } from "../supabase/server";
import { AgencyUser, SignIn } from "../types";
import { parseStringify } from "../utils";
import { createAdminAuthClient } from "../supabase/admin";

export const createUser = async ({ email, password }: SignIn) => {
  const supabase = createAdminAuthClient();

  const newUser: Partial<AgencyUser> = {
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

export const signInWithEmail = async ({ email, password }: SignIn) => {
  const supabase = createServerClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        data: null,
        error: parseStringify(error) as AuthError,
      };
    }

    return {
      data: parseStringify(data.user) as User,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: parseStringify(error) as AuthError,
    };
  }
};
