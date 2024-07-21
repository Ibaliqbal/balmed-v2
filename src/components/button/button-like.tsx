"use client";
import instance from "@/libs/axios/instance";
import { DataPostUser } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

type Props = {
  id?: string | UUID;
  total?: number;
  isLiked?: DataPostUser | undefined;
};

const Like = ({ isLiked, total, id }: Props) => {
  const { data } = useQuery({
    queryKey: ["post-likes", id],
    queryFn: async () =>
      (await instance.get(`/api/posts/${id}/likes`)).data?.initData,
    initialData: { total, isLiked },
    staleTime: Infinity,
  });
  // const {} = useMutation({
  //   mutationFn:
  // })
  return (
    <button
      className={`flex items-center gap-2 disabled:cursor-not-allowed like ${
        data.isLiked && "text-red-600"
      } hover:text-red-600 transition-colors duration-200 ease-out`}
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
