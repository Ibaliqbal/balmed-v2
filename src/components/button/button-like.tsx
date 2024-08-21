"use client";
import { getLikesPost, likePost, unlikePost } from "@/actions/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";
import { FaRegHeart, FaHeart } from "react-icons/fa";

type Props = {
  id?: string | UUID;
  total?: number;
  isLiked?: boolean | undefined;
};

const Like = ({ isLiked, total, id }: Props) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["post-likes", id],
    queryFn: async () => await getLikesPost(id as string),
    initialData: { total, isLiked },
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: async () =>
      data.isLiked ? unlikePost(id as string) : likePost(id as string),
    async onMutate() {
      await queryClient.cancelQueries({ queryKey: ["post-likes", id] });

      const previousData = queryClient.getQueryData<{
        total: number;
        isLiked?: boolean | undefined;
      }>(["post-likes", id]);

      queryClient.setQueryData(["post-likes", id], () => ({
        total: (previousData?.total || 0) + (previousData?.isLiked ? -1 : 1),
        isLiked: !previousData?.isLiked,
      }));

      return { previousData };
    },
    onError(error, _, context) {
      queryClient.setQueryData(["post-likes", id], context?.previousData);
      console.error(error);
    },
  });
  return (
    <button
      className={`flex items-center gap-2 disabled:cursor-not-allowed like ${
        data.isLiked && "text-[#F91880]"
      } hover:text-[#F91880] transition-colors duration-200 ease-out`}
      onClick={() => mutate()} // Pass necessary arguments
    >
      {data.isLiked ? (
        <FaHeart className="w-5 h-5" />
      ) : (
        <FaRegHeart className="w-5 h-5" />
      )}
      {data.total}
    </button>
  );
};

export default Like;
