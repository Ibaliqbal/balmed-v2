import { supabase } from "@/libs/supabase/init";
import HastagTopPostView from "@/views/hastag/hastag-top-post-view";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { hastag: string };
}): Metadata => {
  const hastagContent = decodeURIComponent(params.hastag);
  return {
    title: `${hastagContent} / BM`,
    description: `Explore and engage with the latest trends on Balmed related to ${hastagContent}.`,
    keywords: [hastagContent, "Balmed", "trends"],
    openGraph: {
      title: `${hastagContent} / BM`,
      description: `Explore and engage with the latest trends on Balmed related to ${hastagContent}.`,
    },
  };
};

const Page = async ({ params }: { params: { hastag: string } }) => {
  const { hastag } = params;
  const decoded = decodeURIComponent(hastag);
  const { data } = await supabase
    .from("hastags")
    .select("id, posts")
    .eq("content", decoded)
    .maybeSingle();

  return (
    <HastagTopPostView hastag={decoded} id={data?.id} postsId={data?.posts} />
  );
};

export default Page;
