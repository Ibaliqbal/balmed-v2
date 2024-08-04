import HeaderWithBack from "@/components/header/header-with-back";
import RightSide from "@/layouts/right-side";
import RightTrends from "@/layouts/trends/right-trends";
import { supabase } from "@/libs/supabase/init";
import TrendsView from "@/views/trends/trends-view";

const page = async () => {
  const { data: trends } = await supabase.from("hastags").select();
  return (
    <>
      <main className="col-span-3">
        <HeaderWithBack>
          <h1 className="text-2xl font-semibold">Trends</h1>
        </HeaderWithBack>
        <section className="border-x-2 border-slate-700">
          <TrendsView trends={trends} />
        </section>
      </main>
      <RightSide>
        <RightTrends />
      </RightSide>
    </>
  );
};

export default page;
