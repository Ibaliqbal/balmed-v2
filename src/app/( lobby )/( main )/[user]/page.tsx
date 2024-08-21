import ProfileCard from "@/components/user/user-profile-card";
import TabNavigation from "@/layouts/user-profile/tab-navigation";
import { supabase } from "@/libs/supabase/init";
import UserPosts from "@/views/user/user-posts";
import type { Metadata } from "next";
import { seo } from "@/utils/helpers";
import { getServerUser } from "@/libs/supabase/function";

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
    `${data?.name} (@${data?.username}) / BM`,
    `Discover the profile of ${data?.name} (@${data?.username}). Visit /${data?.username} for more information and updates.`,
    `${params.user}`
  );
};

const page = async ({ params }: { params: { user: string } }) => {
  const user = await getServerUser();
  const { data } = await supabase
    .from("users")
    .select(
      `*, followings:follow!follow_user_id_fkey(count), followers:follow!follow_follow_to_fkey(user_id)`
    )
    .eq("username", decodeURIComponent(params.user))
    .single();
  return (
    <>
      <ProfileCard {...{ ...data }} userLogin={user} />
      <TabNavigation username={data.username} />
      <UserPosts id={data.id} />
    </>
  );
};

export default page;
