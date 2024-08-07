import HomeFormPost from "@/layouts/home/home-form-post";
import HomeHeader from "@/layouts/home/home-header";
import RightHome from "@/layouts/home/right-home";
import MainSection from "@/layouts/main-section";
import RightSide from "@/layouts/right-side";
import ForYou from "@/views/home/for-you";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home / BM",
  description: "This is the home page of the application.",
  keywords: ["twitter clone", "Social media", "balmed"],
  openGraph: {
    title: "Home / BM",
    description: "This is the home page of the application.",
    images: "/demo.png",
  },
};

export default function Home() {
  return (
    <>
      <MainSection>
        <HomeHeader />
        <section className="lg:border-x-2 lg:border-slate-700">
          <HomeFormPost queryKey={["post", "for-you"]} />
          <ForYou />
        </section>
      </MainSection>
      <RightSide>
        <RightHome />
      </RightSide>
    </>
  );
}
