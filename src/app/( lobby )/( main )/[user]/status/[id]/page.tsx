import PostDetail from "@/components/post/post-detail";
import DetailPostFormComment from "@/layouts/detail-post/detail-post-form-comment";
import { supabase } from "@/libs/supabase/init";
import { queryPosting, seo } from "@/utils/helpers";
import ListPOstComment from "@/views/detail-post/list-post-comment";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { user: string; id: string };
}): Promise<Metadata> => {
  const username = decodeURIComponent(params.user);
  const { data } = await supabase
    .from("postings")
    .select("content, media")
    .eq("id", params.id)
    .single();
  return seo(
    `${username} on BM : "${data?.content}"`,
    `Detail post by ${username} at /${username}/status/${params.id}. Explore the content and comments.`,
    `${params.user}/status/${params.id}`
  );
};

const page = async ({ params }: { params: { user: string; id: string } }) => {
  const { data } = await supabase
    .from("postings")
    .select(queryPosting)
    .eq("id", params.id)
    .single();

  return (
    <div>
      <PostDetail post={data} />
      <DetailPostFormComment id={params.id} username={params.user} />
      <ListPOstComment id={params.id} />
    </div>
  );
};

export default page;
