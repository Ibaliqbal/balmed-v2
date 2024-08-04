"use client";
import Loading from "@/components/loading";
import PostCard from "@/components/post/post-card";
import EmptyPosts from "@/layouts/empty-posts";
import instance from "@/libs/axios/instance";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import Link from "next/link";

const UserLikePosts = ({ id }: { id: string | UUID }) => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const { data, isLoading } = useQuery({
    queryKey: ["post", `user-${id}`, "likes"],
    queryFn: async () =>
      (await instance.get(`/api/users/${id}/likes`)).data?.posts,
    enabled: !!id,
  });
  return (
    <section className="pt-8">
      <div className="flex flex-col gap-5">
        {isLoading || userLoading ? (
          <Loading />
        ) : data?.length > 0 ? (
          data?.map((post: GetPost, i: number) => (
            <PostCard key={post.id} {...post} userLogin={user} />
          ))
        ) : (
          <EmptyPosts>
            <h1 className="text-xl text-center">
              Don{"`"}t post what you like,{" "}
              <Link href={"/home"} className="text-blue-600">
                choose the post you like now
              </Link>
            </h1>
          </EmptyPosts>
        )}
      </div>
    </section>
  );
};

export default UserLikePosts;
