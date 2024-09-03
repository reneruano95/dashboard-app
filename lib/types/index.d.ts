import { SupabaseClient } from "@supabase/supabase-js";
import { icons } from "lucide-react";
import { Database, Tables } from "./database.types";
import { SignInSchema } from "./validations";

//  Global types
declare type TypedSupabaseClient = SupabaseClient<Database>;
declare type SignIn = z.infer<typeof SignInSchema>;
declare type Profile = Tables<"users">;
declare type Agency = Tables<"agencies">;
declare type UserRoles = Tables<"user_roles">;
declare type RolePermissions = Tables<"role_permissions">;
declare type Role = Database["public"]["Enums"]["app_role"];
declare type Permission = Database["public"]["Enums"]["app_permission"];

//  Sidebar types
declare type SidebarPageItem = {
  title: string;
  icon: keyof typeof icons;
  href: string;
  hrefAdmin?: string;
  roles: Role[];
};
declare type SidebarPages = {
  label: string;
  children: SidebarPageItem[];
};
declare type SidebarAppItem = {
  title: string;
  icon: keyof typeof icons;
  href: string;
};
declare type SidebarApps = {
  label: string;
  children: SidebarAppItem[];
};
