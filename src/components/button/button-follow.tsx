"use client";
import { useGetUserLogin } from "@/provider/user-provider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { randomUUID, UUID } from "crypto";
import React, { useOptimistic } from "react";

const ButtonFollow = ({
  className,
  id,
}: {
  className: string;
  id: string | UUID;
}) => {
  const { user } = useGetUserLogin();
  const [isFollowing, follwingOptimistic] = useOptimistic(
    user?.followings.some((following) => following.follow_to === id),
    (state, newData: boolean) => newData
  );

  // const {} = useMutation()

  return id !== user?.id ? (
    <button
      className={`${className} text-white self-start rounded-full font-bold disabled:cursor-not-allowed`}
      // onClick={handleFollow}
    >
      {user?.followers.some((follow) => follow.user_id === id)
        ? "Follback"
        : isFollowing
        ? "Unfollow"
        : "Follow"}
    </button>
  ) : null;
};

export default ButtonFollow;
