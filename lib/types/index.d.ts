import { Database, Tables } from "./database.types";

export { SignInSchema, SignIn } from "./validations";
export type AgencyUser = Tables<"users">;
export type AGency = Tables<"agencies">;
export type AgencyRole = Database["public"]["Enums"]["role"];
