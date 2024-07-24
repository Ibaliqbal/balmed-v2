"use client";
import PostCard from "@/components/post/post-card";
import instance from "@/libs/axios/instance";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { LuLoader2 } from "react-icons/lu";

const BookmarksView = () => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const { data, isLoading } = useQuery({
    queryKey: ["post", "user-bookmarks"],
    queryFn: async () =>
      (await instance.get("/api/users/bookmarks")).data?.posts,
  });

  return (
    <section className="pt-4">
      <div className="flex flex-col gap-5">
        {isLoading || userLoading ? (
          <div className="w-full items-center justify-center flex">
            <LuLoader2 className="text-white w-5 h-5 animate-spin " />
          </div>
        ) : (
          data?.map((post: GetPost, i: number) => (
            <PostCard key={post.id} {...post} userLogin={user} />
          ))
        )}
      </div>
    </section>
  );
};

export default BookmarksView;
