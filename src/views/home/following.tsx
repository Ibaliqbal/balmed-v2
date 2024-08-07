"use client";
import { getInfinitePostsByFollowings } from "@/actions/post";
import Loading from "@/components/loading";
import PostCard from "@/components/post/post-card";
import EmptyPosts from "@/layouts/empty-posts";
import InfiniteScrollLayout from "@/layouts/infinite-scroll-layout";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { LuLoader2 } from "react-icons/lu";

const Following = () => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data: posts,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["post", "followings"],
    queryFn: async ({ pageParam }) =>
      await getInfinitePostsByFollowings(pageParam),
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
              No posts here, create your post now
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

export default Following;
