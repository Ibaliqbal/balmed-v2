import { seo } from "@/utils/helpers";
import AllNotificationsView from "@/views/notifications/notifications-all-view";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = seo(
  "All Notifications / BM",
  "View all notifications in the Balmed community.",
  "notifcation"
);

const page = async () => {
  return <AllNotificationsView />;
};

export default page;
