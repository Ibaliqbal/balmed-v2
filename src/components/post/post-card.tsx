import React from "react";
import UserTooltip from "../user/user-tooltip";
import Image from "next/image";
import Link from "next/link";
import { dateConverterNow } from "@/utils/helpers";
import Content from "./post-content";
import Action from "./post-action";
import PostMedia from "./post-media";
import PostMoreAction from "./post-more-action";
import { motion } from "framer-motion";
import { GetPost } from "@/types/post";
import { GetUser } from "@/types/user";

type Props = GetPost & {
  userLogin: GetUser | null;
  index: number;
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
  index,
}: Props) => {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "linear",
          delay: index * 0.2,
        },
      }}
      className="w-full border-b-2 pb-3 border-slate-700"
    >
      <section className="flex gap-4 mb-4 items-center">
        <UserTooltip>
          <Image
            src={"/avatar.jpg"}
            alt={"Avatar"}
            width={70}
            height={70}
            loading={"eager"}
            className="rounded-full w-[50px] h-[50px] object-cover object-center"
          />
        </UserTooltip>
        <div className="flex items-center gap-2 text-md">
          <UserTooltip>
            <Link href={"/"} className="font-semibold">
              {creator.name
                ? creator.name.length > 15
                  ? `${creator.name.slice(0, 15)}...`
                  : creator.name
                : "Iqbal"}
            </Link>
          </UserTooltip>
          <UserTooltip>
            <Link
              href={"/"}
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
          <h1 className="text-sm">
            {dateConverterNow(upload_at ? upload_at : "2024-07-19")}
          </h1>
        </div>
        <PostMoreAction />
      </section>
      <section className="w-full pt-5 flex flex-col gap-3">
        <Content content={content ? content : "Holaaa"} />
        {media.length > 0 ? <PostMedia media={media} /> : null}
      </section>
      <Action
        id={id}
        isCreator={userLogin?.id === creator_id}
        initDataBookmark={userLogin?.bookmarks?.find(
          (data) => data.post_id === id
        )}
        initDataComments={comment[0].count}
        initDataLikes={{
          total: like[0].count,
          isLiked: userLogin?.likes?.find((data) => data.post_id === id),
        }}
        initDataReposts={{
          total: repost[0].count,
          isReposted: userLogin?.reposts?.find((data) => data.post_id === id),
        }}
      />
    </motion.article>
  );
};

export default PostCard;
