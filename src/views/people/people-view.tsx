import UserCard from "@/components/user/user-card";
import { supabase } from "@/libs/supabase/init";
import { getServerSession } from "next-auth";
import React from "react";

const PeopleView = async () => {
  const session = await getServerSession();
  const { data: users } = await supabase
    .from("users")
    .select(
      `name, username, photo, bio, followings:follow_user_id_fkey(count), followers:follow_follow_to_fkey (count)`
    )
    .not("email", "eq", session?.user.email as string);
  return (
    <section className="pt-4 flex flex-col gap-6">
      {users?.map((user, i) => (
        <UserCard key={i} {...user} />
      ))}
    </section>
  );
};

export default PeopleView;
