import AllNotificationsView from "@/views/notifications/notifications-all-view";
import type { Metadata } from "next";

export const revalidate = 0

export const metadata: Metadata = {
  title: "All Notifications / BM",
  description: "View all notifications in the Balmed community.",
  openGraph: {
    title: "All Notifications / BM",
    description: "View all notifications in the Balmed community.",
  },
};

const page = async () => {
  return <AllNotificationsView />;
};

export default page;
