import UserTooltip from "../user/user-tooltip";
import Link from "next/link";
import { dateConverterNow } from "@/utils/helpers";
import Content from "./post-content";
import Action from "./post-action";
import PostMedia from "./post-media";
import PostMoreAction from "./post-more-action";
import { motion } from "framer-motion";
import { GetPost } from "@/types/post";
import { GetUser } from "@/types/user";
import CustomImage from "../ui/image";

type Props = GetPost & {
  userLogin: GetUser | null;
};

const PostCard = ({
  creator,
  content,
  upload_at,
  media,
  like,
  comment,
  repost,
  userLogin,
  id,
  creator_id,
  who_likes,
}: Props) => {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 1,
          type: "spring",
          ease: "circInOut",
        },
      }}
      className="w-full border-b-2 pb-3 border-slate-700 p-4"
    >
      <section className="flex gap-4 mb-4 items-center">
        <UserTooltip {...{ ...creator }}>
          <Link href={`/${encodeURIComponent(creator.username)}`}>
            <CustomImage
              src={
                creator.photo
                  ? creator.photo.url
                  : `https://ui-avatars.com/api/?name=${creator.username}&background=random&color=fff`
              }
              alt={"Avatar"}
              width={48}
              height={48}
              className="rounded-full aspect-square object-cover object-center"
            />
          </Link>
        </UserTooltip>
        <div className="flex items-center gap-2 md:text-md text-sm md:flex-nowrap flex-wrap">
          <UserTooltip {...{ ...creator }}>
            <Link
              href={`/${encodeURIComponent(creator.username)}`}
              className="font-semibold"
            >
              {creator.name
                ? creator.name.length > 15
                  ? `${creator.name.slice(0, 15)}...`
                  : creator.name
                : "Iqbal"}
            </Link>
          </UserTooltip>
          <UserTooltip {...{ ...creator }}>
            <Link
              href={`/${encodeURIComponent(creator.username)}`}
              className="hover:underline hover:underline-offset-2 text-gray-500"
            >
              @
              {creator.username
                ? creator.username.length > 15
                  ? `${creator.username.slice(0, 15)}...`
                  : creator.username
                : "Ibal"}
            </Link>
          </UserTooltip>
          <h1 className="md:text-sm text-xs">
            {dateConverterNow(upload_at ? upload_at : "2024-07-19")}
          </h1>
        </div>
        <PostMoreAction />
      </section>
      <section className="w-full pt-5 flex flex-col gap-3">
        <Content
          content={content ? content : "Holaaa"}
          username={creator.username}
          id={id}
        />
        {media.length > 0 ? <PostMedia media={media} /> : null}
      </section>
      <Action
        id={id}
        creator_username={creator.username}
        isCreator={userLogin?.id === creator_id}
        initDataBookmark={userLogin?.bookmarks?.find(
          (data) => data?.post_id === id
        )}
        initDataComments={comment[0].count}
        initDataLikes={{
          total: like[0].count,
          isLiked: userLogin?.likes?.some((data) => data.post_id === id),
        }}
        initDataReposts={{
          total: repost[0].count,
          isReposted: userLogin?.reposts?.some((data) => data.post_id === id),
        }}
      />
      {who_likes.length > 0 ? (
        <p className="mt-4">
          Liked by{" "}
          <Link
            href={`/${encodeURIComponent(who_likes[0].user.username)}`}
            className="text-blue-600"
          >
            {who_likes[0].user.username}
          </Link>{" "}
          {who_likes.length > 1 && (
            <>
              and{" "}
              <Link href={`/post/${id}/likes`} className="text-blue-600">
                others
              </Link>
            </>
          )}
        </p>
      ) : null}
    </motion.article>
  );
};

export default PostCard;
