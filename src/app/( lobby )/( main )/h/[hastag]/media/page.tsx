import { supabase } from "@/libs/supabase/init";
import { seo } from "@/utils/helpers";
import HastagMediaView from "@/views/hastag/hastag-media-view";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { hastag: string };
}): Metadata => {
  const hastagContent = decodeURIComponent(params.hastag);
  return seo(
    `${hastagContent} / BM`,
    `Discover the latest media content related to ${hastagContent} on Balmed.`,
    `h/${params.hastag}/media`,
    [hastagContent, "Balmed", "trends"]
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
    <HastagMediaView id={data?.id} hastag={decoded} postsId={data?.posts} />
  );
};

export default page;
