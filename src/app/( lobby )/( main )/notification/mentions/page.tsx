import { seo } from "@/utils/helpers";
import MentionsNotificationsView from "@/views/notifications/notifications-mentions-view";
import type { Metadata } from "next";

export const metadata: Metadata = seo(
  "Mentions Notifications / BM",
  "Notifications for mentions in the Balmed community.",
  "notifcation/mentions"
);

export const revalidate = 0;

const page = () => {
  return <MentionsNotificationsView />;
};

export default page;
