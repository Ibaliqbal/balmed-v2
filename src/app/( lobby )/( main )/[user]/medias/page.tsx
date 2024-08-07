import ProfileCard from "@/components/user/user-profile-card";
import TabNavigation from "@/layouts/user-profile/tab-navigation";
import { supabase } from "@/libs/supabase/init";
import UserMedias from "@/views/user/user-medias";
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
    title: `Media posts by ${data?.name} (@${data?.username}) / BM`,
    description: `Explore media posts by ${data?.name} (@${data?.username}) on their profile. Discover photos, videos, and more!`,
    openGraph: {
      title: `Media posts by ${data?.name} (@${data?.username}) / BM`,
      description: `Explore media posts by ${data?.name} (@${data?.username}) on their profile. Discover photos, videos, and more!`,
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
      <UserMedias id={data.id} />
    </>
  );
};

export default page;