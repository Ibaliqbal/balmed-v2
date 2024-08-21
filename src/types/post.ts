import { UUID } from "crypto";
import { MediaPreview } from "./media";
import { User } from "./user";

export type Count = {
  count: number;
};

export type Post = {
  id: string | UUID;
  content: string;
  upload_at: Date | string;
  creator_id: string | UUID;
  comment_id: string | UUID | null;
  media: Array<MediaPreview>;
};

export interface GetPost extends Post {
  creator: Pick<
    User,
    "bio" | "photo" | "name" | "username" | "id" | "header_photo"
  > & {
    followings: Count[];
    followers: Count[];
  };
  like: [Count];
  comment: [Count];
  repost: [Count];
  who_likes: Array<{
    user: {
      username: string; 
    };
  }>;
}
