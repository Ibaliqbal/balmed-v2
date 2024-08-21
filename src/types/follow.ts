import { UUID } from "crypto";
import { MediaPreview } from "./media";
import { Count } from "./post";
import { User } from "./user";

export type Follow = {
  id: string | UUID;
  follow_at: string | UUID;
  follow_to: string | UUID;
  user_id: string | UUID;
};

export type GetFollow = {
  user: Pick<User, "username" | "bio" | "photo" | "name" | "id" | "header_photo"> & {
    followings: Count[];
    followers: Count[];
  };
};
