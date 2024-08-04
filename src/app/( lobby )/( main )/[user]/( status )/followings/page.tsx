import UserCard from "@/components/user/user-card";
import EmptyPosts from "@/layouts/empty-posts";
import { supabase } from "@/libs/supabase/init";
import { GetFollow } from "@/types/follow";
import { UUID } from "crypto";

const page = async ({ params }: { params: { user: string } }) => {
  const {
    data,
  }: { data: { id: string | UUID; followings: Array<GetFollow> } | null } =
    await supabase
      .from("users")
      .select(
        `id, followings:follow!follow_user_id_fkey( user:follow_follow_to_fkey (name, username, bio, photo, id, followers: follow_follow_to_fkey (count), followings: follow_user_id_fkey (count)))`
      )
      .eq("username", decodeURIComponent(params.user))
      .single();

  return (
    <section className="pt-6 flex flex-col gap-6 px-3 pb-8">
      {data?.followings.length ?? 0 > 0 ? (
        data?.followings.map((user: GetFollow, i) => (
          <UserCard key={i} {...user.user} />
        ))
      ) : (
        <EmptyPosts>
          <h1 className="text-center text-xl">
            No followings found for this user.
          </h1>
        </EmptyPosts>
      )}
    </section>
  );
};

export default page;
