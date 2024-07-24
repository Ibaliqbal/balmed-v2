import React from "react";
import Like from "../button/button-like";
import ButtonComment from "../button/button-comment";
import ButtonRepost from "../button/button-repost";
import ButtonBookmark from "../button/button-bookmark";
import ButtonShare from "../button/button-share";
import { DataPostUser } from "@/types/user";
import { UUID } from "crypto";
import ButtonDeletePost from "../button/button-delete-post";

type Props = {
  id: string | UUID;
  isCreator: boolean;
  initDataLikes: {
    total: number;
    isLiked: boolean | undefined;
  };
  initDataReposts: {
    total: number;
    isReposted: boolean | undefined;
  };
  initDataComments: number;
  initDataBookmark: DataPostUser | undefined;
  creator_username: string;
};

const Action = ({
  id,
  initDataBookmark,
  initDataComments,
  initDataLikes,
  initDataReposts,
  isCreator,
  creator_username,
}: Props) => {
  return (
    <section className="flex justify-between mt-7 items-center">
      {/* {isCreator ? <ButtonDeletePost id={id} /> : null} */}
      <ButtonComment
        id={id}
        total={initDataComments}
        username_creator={creator_username}
      />
      <ButtonRepost id={id} {...initDataReposts} />
      <Like id={id} {...initDataLikes} />
      <ButtonBookmark id={id} isBookmarked={initDataBookmark} />
      <ButtonShare id={id} creator_username={creator_username} />
    </section>
  );
};

export default Action;
