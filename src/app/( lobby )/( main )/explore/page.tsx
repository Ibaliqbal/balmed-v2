import Search from "@/components/form/form-search";
import BaseHeader from "@/components/header/base-header";
import RightExplore from "@/layouts/explore/right-explore";
import RightSide from "@/layouts/right-side";
import { supabase } from "@/libs/supabase/init";
import ExploreView from "@/views/explore/explore-view";

const page = async () => {
  const { data: trends } = await supabase.from("hastags").select()
  return (
    <>
      <main className="col-span-3">
        <BaseHeader>
          <div className="py-2 px-4 border-b-2 border-slate-700 border-x-2">
            <Search />
          </div>
        </BaseHeader>
        <section className="border-x-2 border-slate-700">
          <ExploreView trends={trends} />
        </section>
      </main>
      <RightSide>
        <RightExplore />
      </RightSide>
    </>
  );
};

export default page;
