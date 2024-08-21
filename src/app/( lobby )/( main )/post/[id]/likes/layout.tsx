import HeaderWithBack from "@/components/header/header-with-back";
import MainSection from "@/layouts/main-section";
import RightPost from "@/layouts/post/right-post";
import RightSide from "@/layouts/right-side";
import { supabase } from "@/libs/supabase/init";
import { seo } from "@/utils/helpers";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { data } = await supabase
    .from("postings")
    .select("content, creator:users ( username )")
    .eq("id", params.id)
    .single();

  const post = data as {
    content: string;
    creator: { username: string };
  } | null;

  // Assuming data contains content and creator information
  const title = `${post?.creator.username} on BM : ${post?.content}`;
  const description =
    "This page contains information about anyone who has given a like to this post";

  return seo(title, description, `post/${params.id}/likes`);
};

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const { count } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", params.id);

  return (
    <>
      <MainSection>
        <HeaderWithBack>
          <div className="w-fit flex flex-col">
            <h1 className="text-2xl font-semibold">Likes</h1>
            <p className="text-sm">Total like : {count}</p>
          </div>
        </HeaderWithBack>
        <section className="lg:border-x-2 border-slate-700 px-3">
          {children}
        </section>
      </MainSection>
      <RightSide>
        <RightPost />
      </RightSide>
    </>
  );
};

export default layout;
