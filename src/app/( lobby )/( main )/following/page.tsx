import HomeFormPost from "@/layouts/home/home-form-post";
import HomeHeader from "@/layouts/home/home-header";
import RightHome from "@/layouts/home/right-home";
import MainSection from "@/layouts/main-section";
import RightSide from "@/layouts/right-side";
import Following from "@/views/home/following";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Following / BM",
  description: "Following page by user login",
  openGraph: {
    title: "Following / BM",
    description: "Following page by user login",
  }
};

const page = () => {
  return (
    <>
      <MainSection>
        <HomeHeader />
        <section className="lg:border-x-2 border-slate-700">
          <HomeFormPost queryKey={["post", "for-you"]} />
          <Following />
        </section>
      </MainSection>
      <RightSide>
        <RightHome />
      </RightSide>
    </>
  );
};

export default page;
