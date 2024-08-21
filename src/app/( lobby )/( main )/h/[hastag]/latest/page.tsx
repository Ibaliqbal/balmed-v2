import { supabase } from "@/libs/supabase/init";
import { seo } from "@/utils/helpers";
import HastagLatestPostView from "@/views/hastag/hastag-latest-post-view";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { hastag: string };
}): Metadata => {
  const hastagContent = decodeURIComponent(params.hastag);
  return seo(
    `${hastagContent} Latest Media / BM`,
    `Explore the latest media content related to ${hastagContent} on Balmed.`,
    `h/${params.hastag}/latest`,
    [hastagContent, "Balmed", "latest media", "trends"]
  );
};

const page = async ({ params }: { params: { hastag: string } }) => {
  const { hastag } = params;
  const decoded = decodeURIComponent(hastag);
  const { data } = await supabase
    .from("hastags")
    .select("id, posts")
    .eq("content", decoded)
    .maybeSingle();
  return (
    <HastagLatestPostView
      id={data?.id}
      hastag={decoded}
      postsId={data?.posts}
    />
  );
};

export default page;
