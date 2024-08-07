import HeaderWithBack from "@/components/header/header-with-back";
import MainSection from "@/layouts/main-section";
import RightSide from "@/layouts/right-side";
import RightTrends from "@/layouts/trends/right-trends";
import { supabase } from "@/libs/supabase/init";
import { limitTrends } from "@/utils/constant";
import TrendsView from "@/views/trends/trends-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trends / BM",
  description: "Discover and share trends in the Balmed community.",
  keywords: ["balmed", "trends", "community"],
  openGraph: {
    title: "Trends / BM",
    description: "Discover and share trends in the Balmed community.",
  }
};

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
        <HeaderWithBack>
          <h1 className="text-2xl font-semibold">Trends</h1>
        </HeaderWithBack>
        <section className="lg:border-x-2 border-slate-700">
          <TrendsView trends={trends} />
        </section>
      </MainSection>
      <RightSide>
        <RightTrends />
      </RightSide>
    </>
  );
};

export default page;
