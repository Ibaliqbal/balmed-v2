import { supabase } from "@/libs/supabase/init";
import HastagPostView from "@/views/hastag/hastag-post-view";

const Page = async ({ params }: { params: { hastag: string } }) => {
  const { hastag } = params;
  const decoded = decodeURIComponent(hastag);
  const { data } = await supabase
    .from("hastags")
    .select("id, posts")
    .eq("content", decoded)
    .maybeSingle();


  return (
    <HastagPostView hastag={decoded} id={data?.id} postsId={data?.posts} />
  );
};

export default Page;
