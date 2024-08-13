import MentionsNotificationsView from "@/views/notifications/notifications-mentions-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Notifications / BM",
  description: "Notifications for mentions in the Balmed community.",
  openGraph: {
    title: "Mentions Notifications / BM",
    description: "Notifications for mentions in the Balmed community.",
  },
};

const page = () => {
  return <MentionsNotificationsView />;
};

export default page;
