import ProfileCard from "@/components/user/user-profile-card";
import TabNavigation from "@/layouts/user-profile/tab-navigation";
import { supabase } from "@/libs/supabase/init";
import UserReposts from "@/views/user/user-repost";
import { getServerSession } from "next-auth";

const page = async ({ params }: { params: { user: string } }) => {
  const session = await getServerSession();
  const { data: reposts_user } = await supabase
    .from("users")
    .select("id, reposts:reposts (post_id, id)");
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
      <UserReposts id={data.id} />
    </>
  );
};

export default page;
