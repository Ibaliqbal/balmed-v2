"use client";
import { bookmarkedPost, unbookmarkPost } from "@/actions/post";
import { DataPostUser, GetUser } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";
import React from "react";
import toast from "react-hot-toast";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

type Props = {
  id?: string | UUID;
  isBookmarked?: DataPostUser | undefined;
};

const ButtonBookmark = ({ id, isBookmarked }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () =>
      isBookmarked
        ? unbookmarkPost(isBookmarked.id as string)
        : bookmarkedPost(id as string),
    async onMutate() {
      await queryClient.cancelQueries({ queryKey: ["user-login"] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(["user-login"]);

      return { previousData };
    },
    onSuccess: (newData) => {
      if (isBookmarked) {
        queryClient.setQueryData(["user-login"], (oldData: GetUser) => ({
          ...oldData,
          bookmarks: oldData.bookmarks.filter((b) => b.id !== isBookmarked.id),
        }));
        toast.success(newData.message);
      } else {
        toast.success(newData.message);
        queryClient.setQueryData(["user-login"], (oldData: GetUser) => ({
          ...oldData,
          bookmarks: [...oldData.bookmarks, newData.data],
        }));
      }
    },
    onError: (err, newData, context) => {
      toast.error("Something went wrong in the server");
      queryClient.setQueryData(["user-login"], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-login"] });
    },
  });

  return (
    <button
      onClick={() => mutate()}
      className={`disabled:cursor-not-allowed hover:text-yellow-500 transition-colors duration-200 ease-out`}
    >
      {isBookmarked ? (
        <FaBookmark className="w-5 h-5 text-yellow-500" />
      ) : (
        <FaRegBookmark className="w-5 h-5" />
      )}
    </button>
  );
};

export default ButtonBookmark;
