import NotificationFollowCard from "@/components/notification/notification-follow-card";
import NotificationPostCard from "@/components/notification/notification-post-card";
import NotificationWrapper from "@/components/notification/notification-wrapper";
import { getServerUser } from "@/libs/supabase/function";
import { supabase } from "@/libs/supabase/init";
import React from "react";

const AllNotificationsView = async () => {
  const user = await getServerUser();
  const { data } = await supabase
    .from("notifications")
    .select(
      `*, post:postings!post_id(id, content, creator: users (username)), visitor:users!guest_id (name, username, photo)`,
      {
        count: "exact",
      }
    )
    .eq("owner_id", user?.id)
    .order("notif_at", { ascending: false });

  return (
    <section className="pt-4 flex flex-col gap-6 lg:pb-5 pb-12 lg:px-0 px-3">
      {data?.map((notif) =>
        notif.type === "follow" ? (
          <NotificationWrapper
            idNotif={notif.id}
            idPost=""
            type={notif.type}
            username={notif.visitor.username}
            isRead={notif.isAlreadyRead}
            key={notif.id}
          >
            <NotificationFollowCard {...notif.visitor} id={notif.id} />
          </NotificationWrapper>
        ) : (
          <NotificationWrapper
            isRead={notif.isAlreadyRead}
            idNotif={notif.id}
            idPost={notif.post.id}
            type={notif.type}
            username={notif.post.creator.username}
            key={notif.id}
          >
            <NotificationPostCard
              {...{
                ...notif.visitor,
                ...notif.post,
                type: notif.type,
                owner_id: notif.owner_id,
              }}
              usernameLogin={user.username}
            />
          </NotificationWrapper>
        )
      )}
    </section>
  );
};

export default AllNotificationsView;
