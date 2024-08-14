import NotificationPostCard from "@/components/notification/notification-post-card";
import NotificationWrapper from "@/components/notification/notification-wrapper";
import { getServerUser } from "@/libs/supabase/function";
import { supabase } from "@/libs/supabase/init";
import React from "react";

const MentionsNotificationsView = async () => {
  const user = await getServerUser();
  const { data } = await supabase
    .from("notifications")
    .select(
      `*, post:postings!post_id(id, content), visitor:users!guest_id (name, username, photo)`,
      {
        count: "exact",
      }
    )
    .eq("owner_id", user?.id)
    .eq("type", "mention")
    .order("notif_at", { ascending: false });

  return (
    <section className="pt-4 flex flex-col gap-6 lg:pb-5 pb-12">
      {data?.map((notif) => (
        <NotificationWrapper
          idNotif={notif.id}
          idPost={notif.post.id}
          type={notif.type}
          username={notif.visitor.username}
          isRead={notif.isAlreadyRead}
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
      ))}
    </section>
  );
};

export default MentionsNotificationsView;
