"use client";
import Loading from "@/components/loading";
import PostCard from "@/components/post/post-card";
import EmptyPosts from "@/layouts/empty-posts";
import InfiniteScrollLayout from "@/layouts/infinite-scroll-layout";
import instance from "@/libs/axios/instance";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import Link from "next/link";
import { LuLoader2 } from "react-icons/lu";

const UserPosts = ({ id }: { id: string | UUID }) => {
  const { user, isLoading: userLoading } = useGetUserLogin();

  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data: posts,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["post", `user-${id}`],
    queryFn: async ({ pageParam }) =>
      (await instance.get(`/api/users/${id}/posts?page=${pageParam}`)).data,
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
      callback={() => hasNextPage && !isFetching && fetchNextPage()}
      className="pt-5 pb-12"
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
              This user has not posted anything yet,{" "}
              <Link href={`/home`} className="text-blue-600">
                Start creating your own post now
              </Link>
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

export default UserPosts;
