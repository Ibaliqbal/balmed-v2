import Search from "@/components/form/form-search";
import BaseHeader from "@/components/header/base-header";
import RightExplore from "@/layouts/explore/right-explore";
import MainSection from "@/layouts/main-section";
import RightSide from "@/layouts/right-side";
import { supabase } from "@/libs/supabase/init";
import { limitTrends } from "@/utils/constant";
import { seo } from "@/utils/helpers";
import ExploreView from "@/views/explore/explore-view";
import type { Metadata } from "next";

export const metadata: Metadata = seo(
  "Explore / BM",
  "Discover and engage with the latest trends on Balmed.",
  "explore"
);

const page = async () => {
  const { count } = await supabase
    .from("hastags")
    .select("*", { count: "exact", head: true });
  const start = ~~(Math.random() * (count! - limitTrends) + 1);
  const { data: trends } = await supabase
    .from("hastags")
    .select()
    .range(start, start + limitTrends);
  return (
    <>
      <MainSection>
        <BaseHeader>
          <div className="py-2 px-4 border-b-2 border-slate-700 lg:border-x-2">
            <Search />
          </div>
        </BaseHeader>
        <section className="lg:border-x-2 border-slate-700">
          <ExploreView trends={trends} />
        </section>
      </MainSection>
      <RightSide>
        <RightExplore />
      </RightSide>
    </>
  );
};

export default page;
