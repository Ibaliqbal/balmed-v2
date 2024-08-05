"use client";
import Loading from "@/components/loading";
import PostCard from "@/components/post/post-card";
import EmptyPosts from "@/layouts/empty-posts";
import instance from "@/libs/axios/instance";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

const ListPOstComment = ({ id }: { id: string }) => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const { data, isLoading } = useQuery({
    queryKey: ["post", `${id}-comments`],
    queryFn: async () =>
      (await instance.get(`/api/posts/${id}/comments`)).data?.posts,
    enabled: !!id,
  });
  return isLoading || userLoading ? (
    <Loading />
  ) : data?.length > 0 ? (
    data?.map((post: GetPost, i: number) => (
      <PostCard key={post.id} {...post} userLogin={user} />
    ))
  ) : (
    <EmptyPosts>
      <h1 className="text-xl text-center">
        No comment on this post, create your comment now
      </h1>
    </EmptyPosts>
  );
};

export default ListPOstComment;
