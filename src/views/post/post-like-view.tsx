import UserCard from "@/components/user/user-card";
import { supabase } from "@/libs/supabase/init";
import React from "react";

const PostLikeView = async ({ id }: { id: string }) => {
  const { data: totalUserId } = await supabase
    .from("likes")
    .select("user_id")
    .eq("post_id", id)
    .then((all) => ({
      ...all,
      data: all.data?.map((user) => user.user_id),
    }));

  const { data: users } = await supabase
    .from("users")
    .select(
      `name, username, photo, bio, id, header_photo, followings:follow_user_id_fkey(count), followers:follow_follow_to_fkey (count)`
    )
    .in("id", totalUserId as string[]);
    
  return (
    <section className="pt-4 flex flex-col gap-6 lg:pb-5 pb-12">
      {users?.map((user, i) => (
        <UserCard key={i} {...user} />
      ))}
    </section>
  );
};

export default PostLikeView;
