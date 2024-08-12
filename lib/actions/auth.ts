"use server";

import { AuthError, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { createServerClient } from "../supabase/server";
import { SignInValues } from "../types";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

// export const signUpWithEmail = async ({ email, password }: SignInValues) => {
//   const supabase = createServerClient();

//   const newUser: Partial<Tables<"users">> = {
//     username: email.split("@")[0],
//     full_name: "John Doe",
//     avatar_url: "https://api.dicebear.com/9.x/pixel-art/svg",
//     role: null,
//   };

//   try {
//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           ...newUser,
//           app_name: "dashboard-app",
//         },
//       },
//     });

//     if (error) {
//       return {
//         error: parseStringify(error) as AuthError,
//       };
//     }

//     return {
//       error: null,
//     };
//   } catch (error) {
//     return {
//       error: parseStringify(error) as AuthError,
//     };
//   }
// };

export const signInWithEmail = async ({ email, password }: SignInValues) => {
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

export const signOut = async () => {
  const supabase = createServerClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        error: parseStringify(error) as AuthError,
      };
    }

    return {
      error: null,
    };
  } catch (error) {
    return {
      error: parseStringify(error) as AuthError,
    };
  } finally {
    revalidatePath("/sign-in");
    redirect("/sign-in");
  }
};
