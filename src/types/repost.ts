import { UUID } from "crypto";

export type Repost = {
  id: string | UUID;
  user_id: string | UUID;
  post_id: string | UUID;
  repost_at: string | UUID;
};
