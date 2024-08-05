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

const UserReposts = ({ id }: { id: string | UUID }) => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const { data, isLoading } = useQuery({
    queryKey: ["post", `user-${id}`, "with-replies"],
    queryFn: async () =>
      (await instance.get(`/api/users/${id}/comments`)).data?.posts,
    enabled: !!id,
  });

  return (
    <section className="pt-5">
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
              This user has not posted anything yet,{" "}
              <Link href={`/home`} className="text-blue-600">
                Start creating your own post now
              </Link>
            </h1>
          </EmptyPosts>
        )}
      </div>
    </section>
  );
};

export default UserReposts;
