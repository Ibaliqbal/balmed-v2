import HeaderWithBack from "@/components/header/header-with-back";
import RightBookmarks from "@/layouts/bookmarks/right-bookmarks";
import RightSide from "@/layouts/right-side";
import BookmarksView from "@/views/bookmarks/bookmarks-view";
import React from "react";

const page = () => {
  return (
    <>
      <main className="col-span-3">
        <HeaderWithBack>
          <div className="w-fit flex flex-col">
            <h1 className="text-2xl font-semibold">Bookmarks</h1>
            <p className="text-sm">Discover new trends and topics.</p>
          </div>
        </HeaderWithBack>
        <section className="border-x-2 border-slate-700 px-3">
          <BookmarksView />
        </section>
      </main>
      <RightSide>
        <RightBookmarks />
      </RightSide>
    </>
  );
};

export default page;
