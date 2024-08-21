"use client";
import { bookmarkedPost, unbookmarkPost } from "@/actions/post";
import { DataPostUser, GetUser } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";
import { useOptimistic } from "react";
import toast from "react-hot-toast";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

type Props = {
  id?: string | UUID;
  isBookmarked?: DataPostUser | undefined;
};

const ButtonBookmark = ({ id, isBookmarked }: Props) => {
  const queryClient = useQueryClient();
  const [bookmarked, bookmarkedOptimistic] = useOptimistic(
    !!isBookmarked,
    (state, newData: boolean) => newData
  );
  const { mutate } = useMutation({
    mutationFn: async () =>
      !bookmarked ? unbookmarkPost(id as string) : bookmarkedPost(id as string),
    async onMutate() {
      await queryClient.cancelQueries({ queryKey: ["user-login"] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(["user-login"]);

      if (bookmarked) {
        bookmarkedOptimistic(false);
        toast.success("Successfully unbookmark post");
      } else {
        bookmarkedOptimistic(true);
        toast.success("Successfully bookmark post");
      }

      return { previousData };
    },
    onSuccess: (newData) => {
      if (isBookmarked) {
        queryClient.setQueryData(["user-login"], (oldData: GetUser) => ({
          ...oldData,
          bookmarks: oldData.bookmarks.filter((b) => b.id !== newData.data?.id),
        }));
      } else {
        queryClient.setQueryData(["user-login"], (oldData: GetUser) => ({
          ...oldData,
          bookmarks: [...oldData.bookmarks, newData.data],
        }));
      }
    },
    onError: (err, newData, context) => {
      toast.error("Something went wrong in the server");
      queryClient.setQueryData(["user-login"], context?.previousData);
      if (bookmarked) {
        bookmarkedOptimistic(true);
      } else {
        bookmarkedOptimistic(false);
      }
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({ queryKey: ["user-login"] });
      if (!newData?.status) toast.error(newData?.message as string);
    },
  });

  return (
    <button
      onClick={() => mutate()}
      className={`disabled:cursor-not-allowed hover:text-yellow-500 transition-colors duration-200 ease-out`}
      aria-label="button bookmark post"
    >
      {bookmarked ? (
        <FaBookmark className="w-5 h-5 text-yellow-500" />
      ) : (
        <FaRegBookmark className="w-5 h-5" />
      )}
    </button>
  );
};

export default ButtonBookmark;
