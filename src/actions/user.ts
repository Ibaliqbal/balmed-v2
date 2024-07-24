"use server";

import { getUserLogin } from "@/libs/supabase/function";
import { supabase } from "@/libs/supabase/init";
import { getServerSession } from "next-auth";

export async function getIsFollowing(id: string) {
  const session = await getServerSession();
  const { data } = await supabase
    .from("users")
    .select("id, followings:follow!follow_user_id_fkey(follow_to, id)")
    .eq("email", session?.user.email)
    .single();

  return {
    isFollowing: data?.followings.some(
      (following) => following.follow_to === id
    ),
  };
}
