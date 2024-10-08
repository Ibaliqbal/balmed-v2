import HeaderWithBack from "@/components/header/header-with-back";
import MainSection from "@/layouts/main-section";
import RightSide from "@/layouts/right-side";
import RightTrends from "@/layouts/trends/right-trends";
import TabNavigation from "@/layouts/trends/tab-hastag-navigation";
import { supabase } from "@/libs/supabase/init";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { hastag: string };
}) => {
  const { hastag } = params;
  const decoded = decodeURIComponent(hastag);
  const { data } = await supabase
    .from("hastags")
    .select()
    .eq("content", decoded)
    .maybeSingle();
  return (
    <>
      <MainSection>
        <HeaderWithBack>
          <div className="w-fit flex flex-col">
            <h1 className="text-2xl font-semibold">{decoded}</h1>
            <p className="text-sm">
              {data?.posts?.length} {data?.posts?.length > 1 ? "Posts" : "Post"}
            </p>
          </div>
        </HeaderWithBack>
        <TabNavigation hastag={decoded} />
        <section className="lg:border-x-2 border-slate-700">{children}</section>
      </MainSection>
      <RightSide>
        <RightTrends />
      </RightSide>
    </>
  );
};

export default layout;
