"use server";

import { getServerUser } from "@/libs/supabase/function";
import { supabase } from "@/libs/supabase/init";

export async function getCountNotifications() {
  const user = await getServerUser();
  const { count } = await supabase
    .from("notifications")
    .select("id, post:postings!post_id(id)", {
      count: "exact",
    })
    .eq("owner_id", user?.id)
    .is("isAlreadyRead", false);

  return count;
}

export async function addNotification() {
  const { error } = await supabase.from("notifications").insert({
    owner_id: "55ae4a8f-51a5-42be-9855-992678e12cbb",
    post_id: "23394b67-bc00-415d-b4e7-cedf10711883",
    guest_id: "1c0a7da9-5fa7-442e-b2e4-81cbe8d20a86",
    type: "mention",
    isAlreadyRead: false,
  });
  console.log(error);
  if (error) {
    return false;
  } else {
    return true;
  }
}

export async function updateRead(id: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ isAlreadyRead: true })
    .eq("id", id);

  console.log(error);

  if (error) return false;

  return true;
}
