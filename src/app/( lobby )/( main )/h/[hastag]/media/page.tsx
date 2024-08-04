import { supabase } from "@/libs/supabase/init";
import HastagMediaView from "@/views/hastag/hastag-media-view";

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
