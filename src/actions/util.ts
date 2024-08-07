"use server";

import { supabase } from "@/libs/supabase/init";

export async function getRandomStartData(limit: number, table: string) {
  const { count: countUsers } = await supabase
    .from("users")
    .select("*", { count: "exact" });

  const start = ~~(Math.random() * (countUsers! - limit) + 1);

  return start;
}
