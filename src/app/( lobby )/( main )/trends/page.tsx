import HeaderWithBack from "@/components/header/header-with-back";
import RightSide from "@/layouts/right-side";
import RightTrends from "@/layouts/trends/right-trends";
import TrendsView from "@/views/trends/trends-view";
import React from "react";

const page = () => {
  return (
    <>
      <main className="col-span-3">
        <HeaderWithBack>
          <h1 className="text-2xl font-semibold">Trends</h1>
        </HeaderWithBack>
        <section className="border-x-2 border-slate-700">
          <TrendsView />
        </section>
      </main>
      <RightSide>
        <RightTrends />
      </RightSide>
    </>
  );
};

export default page;
