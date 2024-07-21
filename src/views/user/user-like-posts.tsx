"use client";
import PostCard from "@/components/post/post-card";
import instance from "@/libs/axios/instance";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import React from "react";
import { LuLoader2 } from "react-icons/lu";

const UserLikePosts = ({ id }: { id: string | UUID }) => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const { data, isLoading } = useQuery({
    queryKey: ["post", `user-${id}`, "likes"],
    queryFn: async () =>
      (await instance.get(`/api/users/${id}/likes`)).data?.posts,
    enabled: !!id,
  });
  return (
    <section className="pt-8 px-3">
      <div className="flex flex-col gap-5">
        {isLoading || userLoading ? (
          <div className="w-full items-center justify-center flex">
            <LuLoader2 className="text-white w-5 h-5 animate-spin " />
          </div>
        ) : (
          data?.map((post: GetPost, i: number) => (
            <PostCard key={post.id} {...post} userLogin={user} index={i} />
          ))
        )}
      </div>
    </section>
  );
};

export default UserLikePosts;
