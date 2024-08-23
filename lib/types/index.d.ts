import { SupabaseClient } from "@supabase/supabase-js";
import { Database, Tables } from "./database.types";
import { SignInSchema } from "./validations";

declare type TypedSupabaseClient = SupabaseClient<Database>;
declare type SignIn = z.infer<typeof SignInSchema>;
declare type AgencyUser = Tables<"users">;
declare type Agency = Tables<"agencies">;
declare type UserRoles = Tables<"user_roles">;
declare type RolePermissions = Tables<"role_permissions">;
declare type Role = Database["public"]["Enums"]["app_role"];
