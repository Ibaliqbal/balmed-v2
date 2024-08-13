"use client";
import { useGetUserLogin } from "@/provider/user-provider";
import React, { useEffect, useState } from "react";
import { GetPost } from "@/types/post";
import Action from "./post-action";
import UserTooltip from "../user/user-tooltip";
import Link from "next/link";
import { dateFormat } from "@/utils/helpers";
import PostMoreAction from "./post-more-action";
import PostMedia from "./post-media";
import Content from "./post-content";
import CustomImage from "../ui/image";

const PostDetail = ({
  post,
}: {
  post: GetPost;
}) => {
  const { user } = useGetUserLogin();
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const date = new Date(post.upload_at);
    setFormattedDate(
      `${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "numeric",
      })}`
    );
  }, [post.upload_at]);

  return (
    <article className="w-full border-b-2 pb-3 border-slate-700 p-4">
      <section className="flex gap-4 mb-4 items-center">
        <UserTooltip {...{ ...post.creator }}>
          <Link href={`/${encodeURIComponent(post.creator.username)}`}>
            <CustomImage
              src={
                post.creator.photo
                  ? post.creator.photo.url
                  : `https://ui-avatars.com/api/?name=${post.creator.username}&background=random&color=fff`
              }
              alt={"Avatar"}
              width={70}
              height={70}
              className="rounded-full md:w-[50px] md:h-[50px] object-cover object-center"
            />
          </Link>
        </UserTooltip>
        <div className="flex items-center gap-2 md:text-md text-sm md:flex-nowrap flex-wrap">
          <UserTooltip {...{ ...post.creator }}>
            <Link
              href={`/${encodeURIComponent(post.creator.username)}`}
              className="font-semibold"
            >
              {post.creator.name
                ? post.creator.name.length > 15
                  ? `${post.creator.name.slice(0, 15)}...`
                  : post.creator.name
                : "Iqbal"}
            </Link>
          </UserTooltip>
          <UserTooltip {...{ ...post.creator }}>
            <Link
              href={`/${encodeURIComponent(post.creator.username)}`}
              className="hover:underline hover:underline-offset-2 text-gray-500"
            >
              @
              {post.creator.username
                ? post.creator.username.length > 15
                  ? `${post.creator.username.slice(0, 15)}...`
                  : post.creator.username
                : "Ibal"}
            </Link>
          </UserTooltip>
        </div>
        <PostMoreAction />
      </section>
      <section className="w-full pt-5 flex flex-col gap-3">
        <Content
          content={post.content}
          username={post.creator.username}
          id={post.id}
        />
        {post.media.length > 0 ? <PostMedia media={post.media} /> : null}
      </section>
      <section className="pt-5">
        <h1 className="text-sm">
          {`${formattedDate} ~ ${dateFormat(
            post.upload_at ? post.upload_at : new Date()
          )}`}
        </h1>
      </section>
      <Action
        id={post.id}
        creator_username={post.creator.username}
        isCreator={user?.id === post.creator_id}
        initDataBookmark={user?.bookmarks?.find(
          (data) => data?.post_id === post.id
        )}
        initDataComments={post.comment[0].count}
        initDataLikes={{
          total: post.like[0].count,
          isLiked: user?.likes?.some((data) => data.post_id === post.id),
        }}
        initDataReposts={{
          total: post.repost[0].count,
          isReposted: user?.reposts?.some((data) => data.post_id === post.id),
        }}
        isDetail
      />
    </article>
  );
};

export default PostDetail;
