import HeaderWithBack from "@/components/header/header-with-back";
import MainSection from "@/layouts/main-section";
import RightPeople from "@/layouts/people/right-people";
import RightSide from "@/layouts/right-side";
import { seo } from "@/utils/helpers";
import PeopleView from "@/views/people/people-view";
import type { Metadata } from "next";

export const metadata: Metadata = seo(
  "People / BM",
  "Discover and connect with people in your community",
  "people"
);

const page = () => {
  return (
    <>
      <MainSection>
        <HeaderWithBack>
          <h1 className="text-2xl font-semibold">People</h1>
        </HeaderWithBack>
        <section className="px-3 lg:border-x-2 border-slate-700 pb-8">
          <PeopleView />
        </section>
      </MainSection>
      <RightSide>
        <RightPeople />
      </RightSide>
    </>
  );
};

export default page;
