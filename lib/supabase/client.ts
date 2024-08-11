import { useMemo } from "react";
import { createBrowserClient as createClient } from "@supabase/ssr";
import { Database } from "../types/database.types";

export function createBrowserClient() {
  const supabase = useMemo(() => {
    return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }, []);

  return supabase;
}
