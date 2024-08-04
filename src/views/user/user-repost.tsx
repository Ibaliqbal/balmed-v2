"use client";
import Loading from "@/components/loading";
import PostCard from "@/components/post/post-card";
import instance from "@/libs/axios/instance";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";

const UserReposts = ({ id }: { id: string | UUID }) => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const { data, isLoading } = useQuery({
    queryKey: ["post", `user-${id}`, "with-replies"],
    queryFn: async () =>
      (await instance.get(`/api/users/${id}/comments`)).data?.posts,
    enabled: !!id,
  });

  return (
    <section className="pt-8">
      <div className="flex flex-col gap-5">
        {isLoading || userLoading ? (
          <Loading />
        ) : (
          data?.map((post: GetPost, i: number) => (
            <PostCard key={post.id} {...post} userLogin={user} />
          ))
        )}
      </div>
    </section>
  );
};

export default UserReposts;
