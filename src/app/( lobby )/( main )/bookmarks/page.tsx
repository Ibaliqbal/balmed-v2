import HeaderWithBack from "@/components/header/header-with-back";
import RightBookmarks from "@/layouts/bookmarks/right-bookmarks";
import MainSection from "@/layouts/main-section";
import RightSide from "@/layouts/right-side";
import { seo } from "@/utils/helpers";
import BookmarksView from "@/views/bookmarks/bookmarks-view";
import type { Metadata } from "next";

export const metadata: Metadata = seo(
  "Bookmarks / BM",
  "Discover new trends and topics in the balmed community.",
  "bookmarks"
);

const page = () => {
  return (
    <>
      <MainSection>
        <HeaderWithBack>
          <div className="w-fit flex flex-col">
            <h1 className="text-2xl font-semibold">Bookmarks</h1>
            <p className="text-sm">Discover new trends and topics.</p>
          </div>
        </HeaderWithBack>
        <section className="lg:border-x-2 border-slate-700 pb-10">
          <BookmarksView />
        </section>
      </MainSection>
      <RightSide>
        <RightBookmarks />
      </RightSide>
    </>
  );
};

export default page;
