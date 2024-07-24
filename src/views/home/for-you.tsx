"use client";
import PostCard from "@/components/post/post-card";
import { LuLoader2 } from "react-icons/lu";
import instance from "@/libs/axios/instance";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GetPost } from "@/types/post";
import { useGetUserLogin } from "@/provider/user-provider";

const ForYou = () => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const { data, isLoading } = useQuery({
    queryKey: ["post", "for-you"],
    queryFn: async () => (await instance.get("/api/posts")).data?.posts,
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

export default ForYou;
