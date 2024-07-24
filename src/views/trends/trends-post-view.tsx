"use client";
import { getTrendPostsByContent } from "@/actions/post";
import PostCard from "@/components/post/post-card";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import React from "react";
import { LuLoader2 } from "react-icons/lu";

const TrnedsPostView = ({
  id,
  posts,
}: {
  id: string | UUID;
  posts: string[];
}) => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const { data, isLoading } = useQuery({
    queryKey: ["trends", `posts-${id}`],
    queryFn: async () => getTrendPostsByContent(posts),
  });

  return (
    <div className="flex mt-5 flex-col gap-5">
      {isLoading || userLoading ? (
        <div className="w-full items-center justify-center flex">
          <LuLoader2 className="text-white w-5 h-5 animate-spin " />
        </div>
      ) : (
        data?.map((post: GetPost) => (
          <PostCard key={post.id} {...post} userLogin={user} />
        ))
      )}
    </div>
  );
};

export default TrnedsPostView;
