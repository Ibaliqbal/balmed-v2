import { UUID } from "crypto";
import { MediaPreview } from "./media";

export type User = {
  id: string | UUID;
  joined_at: Date | string;
  name: string;
  username: string;
  email: string;
  bio: string;
  web: string;
  location: string;
  photo: MediaPreview;
  header_photo: MediaPreview;
};
export type DataPostUser = { post_id: string | UUID; id: string | UUID };

export interface GetUser extends User {
  likes: Array<DataPostUser>;
  bookmarks: Array<DataPostUser>;
  reposts: Array<DataPostUser>;
  followings: Array<{
    follow_to: string | UUID;
    id: string | UUID;
  }>;
  followers: Array<{
    user_id: string | UUID;
    id: string | UUID;
  }>;
}

export type GetUserDataSimple = {
  id: string | UUID;
  likes: Array<DataPostUser>;
  bookamrks: Array<DataPostUser>;
  reposts: Array<DataPostUser>;
};
