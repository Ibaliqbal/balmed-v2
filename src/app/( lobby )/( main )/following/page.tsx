import HomeFormPost from "@/layouts/home/home-form-post";
import HomeHeader from "@/layouts/home/home-header";
import RightHome from "@/layouts/home/right-home";
import RightSide from "@/layouts/right-side";
import Following from "@/views/home/following";
import React from "react";

const page = () => {
  return (
    <>
      <main className="col-span-3">
        <HomeHeader />
        <section className="px-3 border-x-2 border-slate-700">
          <HomeFormPost queryKey={["post", "for-you"]} />
          <Following />
        </section>
      </main>
      <RightSide>
        <RightHome />
      </RightSide>
    </>
  );
};

export default page;
