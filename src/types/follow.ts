import { UUID } from "crypto";
import { MediaPreview } from "./media";
import { Count } from "./post";

export type Follow = {
  id: string | UUID;
  follow_at: string | UUID;
  follow_to: string | UUID;
  user_id: string | UUID;
};

export type GetFollow = {
  user: {
    name: string;
    username: string;
    bio: string;
    photo: MediaPreview;
    followers: [Count];
    followings: [Count];
  };
};
