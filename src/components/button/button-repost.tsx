"use client";
import { getRepostPost, repostPost, unrepostPost } from "@/actions/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";
import { BiRepost } from "react-icons/bi";

type Props = {
  id?: string | UUID;
  total?: number;
  isReposted?: boolean | undefined;
};

const ButtonRepost = ({ id, isReposted, total }: Props) => {
  const queryKey = ["post-repost", id];
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: queryKey,
    queryFn: async () => await getRepostPost(id as string),
    initialData: { total, isReposted },
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: async () =>
      data.isReposted ? unrepostPost(id as string) : repostPost(id as string),
    async onMutate() {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<{
        total: number;
        isReposted?: boolean | undefined;
      }>(queryKey);

      queryClient.setQueryData(queryKey, () => ({
        total: (previousData?.total || 0) + (previousData?.isReposted ? -1 : 1),
        isReposted: !previousData?.isReposted,
      }));

      return { previousData };
    },
    onError(error, _, context) {
      queryClient.setQueryData(queryKey, context?.previousData);
      console.error(error);
    },
  });
  return (
    <button
      onClick={() => mutate()}
      className={`${
        data.isReposted && "text-[#00BA7C]"
      } flex items-center gap-2 repost disabled:cursor-not-allowed hover:text-[#00BA7C] transition-colors duration-200 ease-out`}
    >
      <BiRepost className={`w-7 h-7`} /> {data.total}
    </button>
  );
};

export default ButtonRepost;
