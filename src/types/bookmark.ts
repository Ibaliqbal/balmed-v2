import { UUID } from "crypto";

export type Bookmark = {
  id: string | UUID;
  bookmark_at: Date | string;
  post_id: string | UUID;
  user_id: string | UUID;
};
