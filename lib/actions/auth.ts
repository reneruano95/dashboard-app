"use server";

import { AuthError, User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

import { createServerClient } from "../supabase/server";
import { SignIn } from "../types";
import { parseStringify } from "../utils";

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

export const signOut = async () => {
  const supabase = createServerClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
      return {
        error: parseStringify(error) as AuthError,
      };
    }

    revalidatePath("/dashboard");
  } catch (error) {
    return {
      error: parseStringify(error) as AuthError,
    };
  }
};
