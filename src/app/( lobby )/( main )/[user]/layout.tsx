import HeaderWithBack from "@/components/header/header-with-back";
import MainSection from "@/layouts/main-section";
import RightSide from "@/layouts/right-side";
import RightUserProfile from "@/layouts/user-profile/right-side-user-profile";
import { supabase } from "@/libs/supabase/init";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) => {
  const { data } = await supabase
    .from("users")
    .select(`username, posts:postings!id (count)`)
    .eq("username", decodeURIComponent(params.user))
    .is("posts.comment_id", null)
    .single();
  const totalPosts = data?.posts[0].count;
  return (
    <>
      <MainSection>
        <HeaderWithBack>
          <div className="w-fit flex flex-col">
            <h1 className="text-2xl font-semibold">
              {data ? data?.username : "User Not found"}
            </h1>
            <p className="text-sm">
              {totalPosts} {totalPosts > 1 ? "Posts" : "Post"}
            </p>
          </div>
        </HeaderWithBack>
        <section className="lg:border-x-2 border-slate-700">
          {data ? (
            children
          ) : (
            <h1 className="text-center text-xl mt-5">User Not found</h1>
          )}
        </section>
      </MainSection>
      <RightSide>
        <RightUserProfile />
      </RightSide>
    </>
  );
};

export default layout;
