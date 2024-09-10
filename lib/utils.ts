import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import { Session } from "@supabase/supabase-js";

import { Role } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseStringify(value: any) {
  return JSON.parse(JSON.stringify(value));
}

// function to format role
export const formatRole = (role: Role) => {
  return role
    ?.replace("_", " ")
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

// function to get user role from session
export const getUserRoleFromSession = (session: Session): Role => {
  const jwt = jwtDecode(session.access_token);
  // @ts-ignore
  return jwt.user_role;
};
