import ProfileCard from "@/components/user/user-profile-card";
import TabNavigation from "@/layouts/user-profile/tab-navigation";
import { supabase } from "@/libs/supabase/init";
import UserReplies from "@/views/user/user-replies";
import { getServerSession } from "next-auth";

import type { Metadata } from "next";
import { seo } from "@/utils/helpers";

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

  return seo(
    `Replies post by ${data?.name} (@${data?.username}) / BM`,
    `Explore replies by ${data?.name} (@${data?.username}) on their profile page. Visit /${params.user}/with_replies for more!`,
    `${params.user}/with_replies`
  );
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
      <UserReplies id={data.id} />
    </>
  );
};

export default page;
