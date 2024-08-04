import Like from "../button/button-like";
import ButtonComment from "../button/button-comment";
import ButtonRepost from "../button/button-repost";
import ButtonBookmark from "../button/button-bookmark";
import ButtonShare from "../button/button-share";
import { DataPostUser } from "@/types/user";
import { UUID } from "crypto";

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
  isDetail?: boolean
};

const Action = ({
  id,
  initDataBookmark,
  initDataComments,
  initDataLikes,
  initDataReposts,
  creator_username,
  isDetail
}: Props) => {
  return (
    <section className="flex justify-between mt-7 items-center">
      {/* {isCreator ? <ButtonDeletePost id={id} /> : null} */}
      <ButtonComment
        id={id}
        total={initDataComments}
        username_creator={creator_username}
        isDetail={isDetail}
      />
      <ButtonRepost id={id} {...initDataReposts} />
      <Like id={id} {...initDataLikes} />
      <ButtonBookmark id={id} isBookmarked={initDataBookmark} />
      <ButtonShare id={id} creator_username={creator_username} />
    </section>
  );
};

export default Action;
