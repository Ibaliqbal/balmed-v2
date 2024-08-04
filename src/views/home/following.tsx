"use client";
import Loading from "@/components/loading";
import PostCard from "@/components/post/post-card";
import EmptyPosts from "@/layouts/empty-posts";
import instance from "@/libs/axios/instance";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

const Following = () => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const { data, isLoading } = useQuery({
    queryKey: ["post", "followings"],
    queryFn: async () =>
      (await instance.get("/api/posts/followings")).data?.posts,
  });
  return (
    <section className="pt-4 grow">
      <div className="flex flex-col gap-5">
        {isLoading || userLoading ? (
          <Loading />
        ) : data.length > 0 ? (
          data?.map((post: GetPost, i: number) => (
            <PostCard key={post.id} {...post} userLogin={user} />
          ))
        ) : (
          <EmptyPosts>
            <h1 className="text-xl text-center">No posts here, creator your post now</h1>
          </EmptyPosts>
        )}
      </div>
    </section>
  );
};

export default Following;
