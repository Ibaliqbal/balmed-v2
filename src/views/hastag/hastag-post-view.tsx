"use client";
import { getPostsByHastag } from "@/actions/post";
import Loading from "@/components/loading";
import PostCard from "@/components/post/post-card";
import EmptyPosts from "@/layouts/empty-posts";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const HastagPostView = ({
  postsId,
  id,
  hastag,
}: {
  postsId: string[];
  id: string;
  hastag: string;
}) => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const { data, isLoading } = useQuery({
    queryKey: ["post", `hastag-${id}`, "latest"],
    queryFn: async () => await getPostsByHastag(postsId),
  });
  return (
    <section className="pt-4">
      {isLoading || userLoading ? (
        <Loading />
      ) : data?.length ?? 0 > 0 ? (
        <div className="flex flex-col gap-5">
          {data?.map((post: GetPost, i: number) => (
            <PostCard key={post.id} {...post} userLogin={user} />
          ))}
        </div>
      ) : (
        <EmptyPosts>
          <h1 className="text-xl text-center">
            There are no posts using the hashtag {hastag},{" "}
            <Link href={"/trends"} className="text-blue-600">
              look for the trends you want now
            </Link>
          </h1>
        </EmptyPosts>
      )}
    </section>
  );
};

export default HastagPostView;
