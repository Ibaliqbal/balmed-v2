"use client";
import { GetPost } from "@/types/post";
import PostCard from "@/components/post/post-card";
import EmptyPosts from "@/layouts/empty-posts";
import Link from "next/link";
import { useGetUserLogin } from "@/provider/user-provider";
import { useQuery } from "@tanstack/react-query";
import { getSearchLatest } from "@/actions/post";
import Loading from "@/components/loading";

const SearchLatestView = ({ query }: { query: string }) => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const { data, isLoading } = useQuery({
    queryKey: ["post", `search-${query}`, "latest"],
    queryFn: async () => await getSearchLatest(query),
    enabled: !!query,
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
          <div className="w-full">
            <h1 className="font-bold text-5xl text-center">No result for</h1>
            <p className="font-bold text-4xl text-center">{`"${query}"`}</p>
            <p className="mt-2 text-center">
              Try searching for something else, or check your Search settings to
              see if {"they’re"} protecting you from potentially sensitive
              content.
            </p>
          </div>
        </EmptyPosts>
      )}
    </section>
  );
};

export default SearchLatestView;
