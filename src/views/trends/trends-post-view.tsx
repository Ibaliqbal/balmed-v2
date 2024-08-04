"use client";
import { getTrendPostsByContent } from "@/actions/post";
import Loading from "@/components/loading";
import PostCard from "@/components/post/post-card";
import { useGetUserLogin } from "@/provider/user-provider";
import { GetPost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";

const TrendsPostView = ({
  id,
  posts,
}: {
  id: string | UUID;
  posts: string[];
}) => {
  const { user, isLoading: userLoading } = useGetUserLogin();
  const { data, isLoading } = useQuery({
    queryKey: ["trends", `posts-${id}`],
    queryFn: async () => getTrendPostsByContent(posts),
  });

  return (
    <div className="flex mt-5 flex-col gap-5">
      {isLoading || userLoading ? (
        <Loading />
      ) : (
        data?.map((post: GetPost) => (
          <PostCard key={post.id} {...post} userLogin={user} />
        ))
      )}
    </div>
  );
};

export default TrendsPostView;
