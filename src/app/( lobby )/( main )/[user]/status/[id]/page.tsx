import PostDetail from "@/components/post/post-detail";
import DetailPostFormComment from "@/layouts/detail-post/detail-post-form-comment";
import { supabase } from "@/libs/supabase/init";
import { queryPosting } from "@/utils/helpers";
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
  return {
    title: `${username} on BM : "${data?.content}"`,
    description: `Detail post by ${username} at /${username}/status/${params.id}. Explore the content and comments.`,
    openGraph: {
      title: `${username} on BM : "${data?.content}"`,
      description: `Detail post by ${username} at /${username}/status/${params.id}. Explore the content and comments.`,
      images: data?.media.length > 0 ? data?.media[0].url : "/demo.png",
    },
  };
};

const page = async ({ params }: { params: { user: string; id: string } }) => {
  const { data } = await supabase
    .from("postings")
    .select(queryPosting)
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
