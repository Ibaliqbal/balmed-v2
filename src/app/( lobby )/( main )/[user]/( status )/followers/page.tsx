import UserCard from "@/components/user/user-card";
import { supabase } from "@/libs/supabase/init";
import { GetFollow } from "@/types/follow";
import { UUID } from "crypto";

const page = async ({ params }: { params: { user: string } }) => {
  const {
    data,
  }: { data: { id: string | UUID; followers: Array<GetFollow> } | null } =
    await supabase
      .from("users")
      .select(
        `id, followers:follow!follow_follow_to_fkey( user:follow_user_id_fkey (name, username, bio, photo, id, followers: follow_follow_to_fkey (count), followings: follow_user_id_fkey (count)))`
      )
      .eq("username", decodeURIComponent(params.user))
      .single();

  return (
    <section className="pt-6 flex flex-col gap-6 px-3 pb-10">
      {data?.followers.map((user: GetFollow, i) => (
        <UserCard {...user.user} key={i} />
      ))}
    </section>
  );
};

export default page;
