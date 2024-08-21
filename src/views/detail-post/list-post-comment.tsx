"use client";
import { getInfiniteComments } from "@/actions/post";
import Loading from "@/components/loading";
import PostCard from "@/components/post/post-card";
import EmptyPosts from "@/layouts/empty-posts";
import InfiniteScrollLayout from "@/layouts/infinite-scroll-layout";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LuLoader2 } from "react-icons/lu";

const ListPOstComment = ({ id }: { id: string }) => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data: posts,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["post", `${id}-comments`],
    queryFn: async ({ pageParam }) => await getInfiniteComments(pageParam, id),
    initialPageParam: 0,
    getNextPageParam: (lastPage, nextPage) => {
      return nextPage.length * 10 >= lastPage.max!
        ? undefined
        : nextPage.length * 10;
    },
    enabled: !!id,
  });

  const datas = posts?.pages.flatMap((datas) => datas.data);

  return (
    <InfiniteScrollLayout
      className="pt-4 pb-12"
      callback={() => hasNextPage && !isFetching && fetchNextPage()}
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
              No comment on this post, create your comment now
            </h1>
          </EmptyPosts>
        )}
      </div>
      {isFetchingNextPage && (
        <div className="w-full items-center justify-center flex mt-3">
          <LuLoader2 className="w-5 h-5 animate-spin " />
        </div>
      )}
    </InfiniteScrollLayout>
  );
};

export default ListPOstComment;
