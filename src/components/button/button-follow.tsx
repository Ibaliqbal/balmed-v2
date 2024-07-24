"use client";
import { useGetUserLogin } from "@/provider/user-provider";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import React from "react";

const ButtonFollow = ({
  className,
  id,
}: {
  className: string;
  id: string | UUID;
}) => {
  const { user } = useGetUserLogin();
  const {} = useQuery({
    queryKey: ["follow-btn", id],
    initialData: {
      isFollowing: user?.followings.some(
        (following) => following.follow_to === id
      ),
    },
  });
  return id !== user?.id ? (
    <button
      className={`${className} text-white self-start rounded-full font-bold disabled:cursor-not-allowed`}
    >
      Follow
    </button>
  ) : null;
};

export default ButtonFollow;
