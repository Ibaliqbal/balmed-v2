import HomeFormPost from "@/layouts/home/home-form-post";
import HomeHeader from "@/layouts/home/home-header";
import RightHome from "@/layouts/home/right-home";
import MainSection from "@/layouts/main-section";
import RightSide from "@/layouts/right-side";
import { seo } from "@/utils/helpers";
import ForYou from "@/views/home/for-you";
import type { Metadata } from "next";

export const metadata: Metadata = seo(
  "Home / BM",
  "This is the home page of the application.",
  "home",
  ["twitter clone", "Social media", "balmed"]
);

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
