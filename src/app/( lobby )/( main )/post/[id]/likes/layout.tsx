import HeaderWithBack from "@/components/header/header-with-back";
import MainSection from "@/layouts/main-section";
import RightPost from "@/layouts/post/right-post";
import RightSide from "@/layouts/right-side";
import { supabase } from "@/libs/supabase/init";

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
        <section className="lg:border-x-2 border-slate-700 px-3">{children}</section>
      </MainSection>
      <RightSide>
        <RightPost />
      </RightSide>
    </>
  );
};

export default layout;
