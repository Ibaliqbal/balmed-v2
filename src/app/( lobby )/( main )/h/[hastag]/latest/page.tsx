import { supabase } from "@/libs/supabase/init";
import HastagLatestPostView from "@/views/hastag/hastag-latest-post-view";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { hastag: string };
}): Metadata => {
  const hastagContent = decodeURIComponent(params.hastag);
  return {
    title: `${hastagContent} Latest Media / BM`,
    description: `Explore the latest media content related to ${hastagContent} on Balmed.`,
    keywords: [hastagContent, "Balmed", "latest media", "trends"],
    openGraph: {
      title: `${hastagContent} Latest Media / BM`,
      description: `Explore the latest media content related to ${hastagContent} on Balmed.`,
      url: `/h/${hastagContent}/latest`,
    },
  };
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
