"use client";
import { getInfiniteLatestPostByHastag } from "@/actions/post";
import Loading from "@/components/loading";
import PostCard from "@/components/post/post-card";
import EmptyPosts from "@/layouts/empty-posts";
import InfiniteScrollLayout from "@/layouts/infinite-scroll-layout";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { LuLoader2 } from "react-icons/lu";

const HastagLatestPostView = ({
  postsId,
  id,
  hastag,
}: {
  postsId: string[];
  id: string;
  hastag: string;
}) => {
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
    queryKey: ["post", `hastag-${id}`, "latest"],
    queryFn: async ({ pageParam }) =>
      await getInfiniteLatestPostByHastag(postsId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, nextPage) => {
      return nextPage.length * 10 >= lastPage.max!
        ? undefined
        : nextPage.length * 10;
    },
    enabled: !!hastag,
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
      {status == "pending" || userLoading ? (
        <Loading />
      ) : datas?.length ?? 0 > 0 ? (
        <div className="flex flex-col gap-5">
          {datas?.map((post: GetPost, i: number) => (
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
      {isFetchingNextPage && (
        <div className="w-full items-center justify-center flex mt-3">
          <LuLoader2 className="text-white w-5 h-5 animate-spin " />
        </div>
      )}
    </InfiniteScrollLayout>
  );
};

export default HastagLatestPostView;
