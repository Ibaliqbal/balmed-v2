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
    .single();
  return (
    <>
      <MainSection>
        <HeaderWithBack>
          <div className="w-fit flex flex-col">
            <h1 className="text-2xl font-semibold">{data?.username}</h1>
            <p className="text-sm">
              {data?.posts[0].count}{" "}
              {data?.posts[0].count > 1 ? "Posts" : "Post"}
            </p>
          </div>
        </HeaderWithBack>
        <section className="lg:border-x-2 border-slate-700">{children}</section>
      </MainSection>
      <RightSide>
        <RightUserProfile />
      </RightSide>
    </>
  );
};

export default layout;
