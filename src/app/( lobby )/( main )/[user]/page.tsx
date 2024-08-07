import ProfileCard from "@/components/user/user-profile-card";
import TabNavigation from "@/layouts/user-profile/tab-navigation";
import { supabase } from "@/libs/supabase/init";
import UserPosts from "@/views/user/user-posts";
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
    title: `${data?.name} (@${data?.username}) / BM`,
    description: `Discover the profile of ${data?.name} (@${data?.username}). Visit /${data?.username} for more information and updates.`,
    openGraph: {
      title: `${data?.name} (@${data?.username}) / BM`,
      description: `Discover the profile of ${data?.name} (@${data?.username}). Visit /${data?.username} for more information and updates.`,
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
      <UserPosts id={data.id} />
    </>
  );
};

export default page;
