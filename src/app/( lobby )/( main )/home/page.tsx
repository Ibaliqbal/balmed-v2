import HomeFormPost from "@/layouts/home/home-form-post";
import HomeHeader from "@/layouts/home/home-header";
import RightHome from "@/layouts/home/right-home";
import RightSide from "@/layouts/right-side";
import ForYou from "@/views/home/for-you";

export default async function Home() {
  return (
    <>
      <main className="col-span-3">
        <HomeHeader />
        <section className="px-3 border-x-2 border-slate-700">
          <HomeFormPost queryKey={["post", "for-you"]} />
          <ForYou />
        </section>
      </main>
      <RightSide>
        <RightHome />
      </RightSide>
    </>
  );
}
