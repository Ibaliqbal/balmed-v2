"use client";
import { useGetUserLogin } from "@/provider/user-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";
import React, { useOptimistic } from "react";
import { follow, unfollow } from "@/actions/user";
import { GetUser } from "@/types/user";
import toast from "react-hot-toast";

const ButtonFollow = ({
  className,
  id,
}: {
  className: string;
  id: string | UUID;
}) => {
  const queryClient = useQueryClient();
  const { user, isLoading } = useGetUserLogin();
  const [isFollowing, followingOptimistic] = useOptimistic(
    !!user?.followings.find((following) => following.follow_to === id),
    (state, newData: boolean) => newData
  );

  const { mutate } = useMutation({
    mutationFn: async () =>
      !isFollowing
        ? unfollow(
            user?.followings.find((follow) => follow.follow_to === id)?.id ?? ""
          )
        : follow(id, user?.id as string),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["user-login"] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(["user-login"]);

      if (isFollowing) {
        followingOptimistic(false);
        toast.success("Successfully unfollowed user");
      } else {
        followingOptimistic(true);
        toast.success("Successfully followed user");
      }
      return { previousData };
    },
    onSuccess: (newData) => {
      if (user?.followings.some((following) => following.follow_to === id)) {
        queryClient.setQueryData(["user-login"], (oldData: GetUser) => ({
          ...oldData,
          followings: oldData.followings.filter(
            (follow) => follow.id !== newData.data.id
          ),
        }));
      } else {
        queryClient.setQueryData(["user-login"], (oldData: GetUser) => ({
          ...oldData,
          followings: [...oldData.followings, newData.data],
        }));
      }
    },
    onError: (err, newData, ctx) => {
      toast.error("Something went wrong in the server");
      console.log(err);
      queryClient.setQueryData(["user-login"], ctx?.previousData);
      if (isFollowing) {
        followingOptimistic(true);
      } else {
        followingOptimistic(false);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-login"] });
    },
  });

  return id !== user?.id ? (
    <button
      className={`${className} self-start rounded-full font-bold disabled:cursor-not-allowed text-white`}
      onClick={() => mutate()}
      disabled={isLoading}
    >
      {isFollowing
        ? "Unfollow"
        : user?.followers.some((follow) => follow.user_id === id)
        ? "Follback"
        : "Follow"}
    </button>
  ) : null;
};

export default ButtonFollow;
