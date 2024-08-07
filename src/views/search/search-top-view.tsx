"use client";
import { useGetUserLogin } from "@/provider/user-provider";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { getInfiniteSearchTop } from "@/actions/post";
import Loading from "@/components/loading";
import { GetPost } from "@/types/post";
import PostCard from "@/components/post/post-card";
import EmptyPosts from "@/layouts/empty-posts";
import InfiniteScrollLayout from "@/layouts/infinite-scroll-layout";
import { LuLoader2 } from "react-icons/lu";

const SearchTopView = ({ query }: { query: string }) => {
  const { user, isLoading: userLoading } = useGetUserLogin();

  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data: posts,
    status,
    isFetching,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: ["post", `search-${query}`, "top"],
    queryFn: async ({ pageParam }) =>
      await getInfiniteSearchTop(query, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, nextPage) => {
      return nextPage.length * 10 >= lastPage.max!
        ? undefined
        : nextPage.length * 10;
    },
    enabled: !!query,
  });

  if (isError)
    return (
      <section className="pt-4">
        <h1 className="text-center">{error.message}</h1>
      </section>
    );

  const datas = posts?.pages.flatMap((datas) => datas.data);

  return (
    <InfiniteScrollLayout
      callback={() => hasNextPage && !isFetching && fetchNextPage()}
      className="pt-4 pb-12"
    >
      {status === "pending" || userLoading ? (
        <Loading />
      ) : datas?.length ?? 0 > 0 ? (
        <div className="flex flex-col gap-5">
          {datas?.map((post: GetPost, i: number) => (
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
      {isFetchingNextPage && (
        <div className="w-full items-center justify-center flex mt-3">
          <LuLoader2 className="text-white w-5 h-5 animate-spin " />
        </div>
      )}
    </InfiniteScrollLayout>
  );
};

export default SearchTopView;
