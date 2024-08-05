"use client";
import PostCard from "@/components/post/post-card";
import instance from "@/libs/axios/instance";
import { useQuery } from "@tanstack/react-query";
import { GetPost } from "@/types/post";
import { useGetUserLogin } from "@/provider/user-provider";
import EmptyPosts from "@/layouts/empty-posts";
import Loading from "@/components/loading";

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
          <Loading />
        ) : data.length > 0 ? (
          data?.map((post: GetPost, i: number) => (
            <PostCard key={post.id} {...post} userLogin={user} />
          ))
        ) : (
          <EmptyPosts>
            <h1 className="text-xl text-center">
              No posts here, create your post now
            </h1>
          </EmptyPosts>
        )}
      </div>
    </section>
  );
};

export default ForYou;
