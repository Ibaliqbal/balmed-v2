import ProfileCard from "@/components/user/user-profile-card";
import TabNavigation from "@/layouts/user-profile/tab-navigation";
import { supabase } from "@/libs/supabase/init";
import UserLikePosts from "@/views/user/user-like-posts";
import { getServerSession } from "next-auth";

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
    title: `Posts like by ${data?.name} (@${data?.username}) / BM`,
    description: `Explore the posts liked by ${data?.name} (@${data?.username}) on their profile. Visit /${data?.username}/likes for more insights.`,
    openGraph: {
      title: `Posts like by ${data?.name} (@${data?.username}) / BM`,
      description: `Explore the posts liked by ${data?.name} (@${data?.username}) on their profile. Visit /${data?.username}/likes for more insights.`,
    },
  };
};

const page = async ({ params }: { params: { user: string } }) => {
  const session = await getServerSession();
  const { data } = await supabase
    .from("users")
    .select(
      `*, followings:follow!follow_user_id_fkey(count), followers:follow!follow_follow_to_fkey(count)`
    )
    .eq("username", decodeURIComponent(params.user))
    .single();
  return (
    <>
      <ProfileCard {...{ ...data, emailLogin: session?.user.email }} />
      <TabNavigation username={data.username} />
      <UserLikePosts id={data.id} />
    </>
  );
};

export default page;
