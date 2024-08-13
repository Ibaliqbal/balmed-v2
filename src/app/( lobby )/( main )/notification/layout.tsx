import HeaderWithBack from "@/components/header/header-with-back";
import RightBookmarks from "@/layouts/bookmarks/right-bookmarks";
import MainSection from "@/layouts/main-section";
import TabNavigation from "@/layouts/notifications/tab-navigation";
import RightSide from "@/layouts/right-side";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainSection>
        <HeaderWithBack>
          <div className="w-fit flex flex-col">
            <h1 className="text-2xl font-semibold">Notifactions</h1>
            <p className="text-sm">Discover new trends and topics.</p>
          </div>
        </HeaderWithBack>
        <TabNavigation />
        <section className="px-3 lg:border-x-2 border-slate-700 pb-8">
          {children}
        </section>
      </MainSection>
      <RightSide>
        <RightBookmarks />
      </RightSide>
    </>
  );
};

export default layout;
