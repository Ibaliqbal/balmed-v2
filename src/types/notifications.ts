import { UUID } from "crypto";

enum TypeNotif {
  comment = "comment",
  follow = "follow",
  like = "like",
  mention = "mention",
}

export type Notification = {
  id: string | UUID;
  type: TypeNotif;
  isAlreadyRead: boolean;
  notif_at: string | Date;
  post_id: string | UUID;
  user_id: string | UUID;
};

