"use client";
import { getInfinitePostsBookmarks } from "@/actions/user";
import Loading from "@/components/loading";
import PostCard from "@/components/post/post-card";
import EmptyPosts from "@/layouts/empty-posts";
import InfiniteScrollLayout from "@/layouts/infinite-scroll-layout";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { LuLoader2 } from "react-icons/lu";

const BookmarksView = () => {
  const { user, isLoading: userLoading } = useGetUserLogin();

  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data: posts,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["post", "user-bookmarks"],
    queryFn: async ({ pageParam }) =>
      await getInfinitePostsBookmarks(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, nextPage) => {
      return nextPage.length * 10 >= lastPage.max!
        ? undefined
        : nextPage.length * 10;
    },
  });

  const datas = posts?.pages.flatMap((datas) => datas.data);

  return (
    <InfiniteScrollLayout
      callback={() => hasNextPage && !isFetching && fetchNextPage()}
      className="pt-4 pb-12"
    >
      <div className="flex flex-col gap-5">
        {status === "pending" || userLoading ? (
          <Loading />
        ) : datas?.length ?? 0 > 0 ? (
          datas?.map((post: GetPost, i: number) => (
            <PostCard key={post.id} {...post} userLogin={user} />
          ))
        ) : (
          <EmptyPosts>
            <h1 className="text-xl text-center">
              Not the post you bookmarked,{" "}
              <Link href={"/home"} className="text-blue-600">
                mark the post you like now
              </Link>
            </h1>
          </EmptyPosts>
        )}
      </div>
      {isFetchingNextPage && (
        <div className="w-full items-center justify-center flex mt-3">
          <LuLoader2 className="text-white w-5 h-5 animate-spin " />
        </div>
      )}
    </InfiniteScrollLayout>
  );
};

export default BookmarksView;
