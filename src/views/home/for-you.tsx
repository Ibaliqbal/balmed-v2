"use client";
import PostCard from "@/components/post/post-card";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GetPost } from "@/types/post";
import { useGetUserLogin } from "@/provider/user-provider";
import EmptyPosts from "@/layouts/empty-posts";
import Loading from "@/components/loading";
import { getInfinitePostsForYou } from "@/actions/post";
import InfiniteScrollLayout from "@/layouts/infinite-scroll-layout";
import { LuLoader2 } from "react-icons/lu";
import { AnimatePresence } from "framer-motion";

const ForYou = () => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data: posts,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["post", "for-you"],
    queryFn: async ({ pageParam }) => await getInfinitePostsForYou(pageParam),
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
      className="pt-4 md:pb-12 pb-10"
    >
      <div className="flex flex-col gap-5">
        {status === "pending" || userLoading ? (
          <Loading />
        ) : datas?.length ?? 0 > 0 ? (
          <AnimatePresence mode="popLayout">
            {datas?.map((post: GetPost, i: number) => (
              <PostCard key={post.id} {...post} userLogin={user} />
            ))}
          </AnimatePresence>
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

export default ForYou;
