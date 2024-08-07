import { supabase } from "@/libs/supabase/init";
import HastagMediaView from "@/views/hastag/hastag-media-view";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { hastag: string };
}): Metadata => {
  const hastagContent = decodeURIComponent(params.hastag);
  return {
    title: `${hastagContent} Media / BM`,
    description: `Discover the latest media content related to ${hastagContent} on Balmed.`,
    keywords: [hastagContent, "Balmed", "media", "trends"],
    openGraph: {
      title: `${hastagContent} Media / BM`,
      description: `Discover the latest media content related to ${hastagContent} on Balmed.`,
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
    <HastagMediaView id={data?.id} hastag={decoded} postsId={data?.posts} />
  );
};

export default page;
