import UserCard from "@/components/user/user-card";
import EmptyPosts from "@/layouts/empty-posts";
import { supabase } from "@/libs/supabase/init";
import { GetFollow } from "@/types/follow";
import { UUID } from "crypto";

import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { user: string };
}): Promise<Metadata> => {
  const { data } = await supabase
    .from("users")
    .select("name, username")
    .eq("username", decodeURIComponent(params.user))
    .maybeSingle();

  return {
    title: `Followers ${data?.name} (@${data?.username}) / BM`,
    description: "This is the user profile page of the application.",
    openGraph: {
      title: `Followers ${data?.name} (@${data?.username}) / BM`,
      description: "This is the user profile page of the application.",
    },
  };
};

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
    <section className="pt-6 flex flex-col gap-6 px-3 pb-12">
      {data?.followers.length ?? 0 > 0 ? (
        data?.followers.map((user: GetFollow, i) => (
          <UserCard {...user.user} key={i} />
        ))
      ) : (
        <EmptyPosts>
          <h1 className="text-xl text-center">
            No followers found for this user.
          </h1>
        </EmptyPosts>
      )}
    </section>
  );
};

export default page;
