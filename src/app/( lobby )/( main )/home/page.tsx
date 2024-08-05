import HomeFormPost from "@/layouts/home/home-form-post";
import HomeHeader from "@/layouts/home/home-header";
import RightHome from "@/layouts/home/right-home";
import MainSection from "@/layouts/main-section";
import RightSide from "@/layouts/right-side";
import ForYou from "@/views/home/for-you";

export default function Home() {
  return (
    <>
      <MainSection>
        <HomeHeader />
        <section className="border-x-2 border-slate-700">
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
