import { Database, Tables } from "./database.types";
import { SignInSchema } from "./validations";

declare type SignIn = z.infer<typeof SignInSchema>;
declare type AgencyUser = Tables<"users">;
declare type Agency = Tables<"agencies">;
declare type AgencyRole = Database["public"]["Enums"]["role"];
