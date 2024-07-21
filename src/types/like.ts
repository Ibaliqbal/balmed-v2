import { UUID } from "crypto";

export type Like = {
  id: string | UUID;
  like_at: Date | string;
  post_id: string | UUID;
  user_id: string | UUID;
};
