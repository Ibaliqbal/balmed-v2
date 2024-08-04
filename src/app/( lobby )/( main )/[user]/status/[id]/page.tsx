import PostDetail from "@/components/post/post-detail";
import DetailPostFormComment from "@/layouts/detail-post/detail-post-form-comment";
import { supabase } from "@/libs/supabase/init";
import ListPOstComment from "@/views/detail-post/list-post-comment";

const page = async ({ params }: { params: { user: string; id: string } }) => {
  const { data } = await supabase
    .from("postings")
    .select(
      `*, comment:postings (count), like:likes!id(count), repost:reposts!id(count), creator:users (name, username, photo, bio, id, followers:follow_follow_to_fkey (count), followings:follow_user_id_fkey (count))`
    )
    .eq("id", params.id)
    .single();

  const timeUpload = new Date(data.upload_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "numeric",
    formatMatcher: "basic",
  });
  return (
    <div>
      <PostDetail post={data} time_upload={timeUpload} />
      <DetailPostFormComment id={params.id} username={params.user} />
      <ListPOstComment id={params.id} />
    </div>
  );
};

export default page;
