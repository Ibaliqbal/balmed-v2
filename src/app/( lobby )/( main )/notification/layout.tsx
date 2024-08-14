import { getCountNotifications } from "@/actions/notification";
import HeaderWithBack from "@/components/header/header-with-back";
import RightBookmarks from "@/layouts/bookmarks/right-bookmarks";
import MainSection from "@/layouts/main-section";
import TabNavigation from "@/layouts/notifications/tab-navigation";
import RightSide from "@/layouts/right-side";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const countNotif = await getCountNotifications();
  return (
    <>
      <MainSection>
        <HeaderWithBack>
          <div className="w-fit flex flex-col">
            <h1 className="text-2xl font-semibold">Notifactions</h1>
            <p className="text-sm">
              You have {countNotif} notification{countNotif ?? 0 > 1 ? "s" : ""}
            </p>
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
