"use client";
import instance from "@/libs/axios/instance";
import { DataPostUser } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import React from "react";
import { BiRepost } from "react-icons/bi";

type Props = {
  id?: string | UUID;
  total?: number;
  isReposted?: DataPostUser | undefined;
};

const ButtonRepost = ({ id, isReposted, total }: Props) => {
  const { data } = useQuery({
    queryKey: ["post-repost", id],
    queryFn: async () =>
      (await instance.get(`/api/posts/${id}/repost`)).data?.initData,
    initialData: { total, isReposted },
    staleTime: Infinity,
  });
  // const {} = useMutation()
  return (
    <button
      className={`${
        data.isReposted && "text-sky-500"
      } flex items-center gap-2 repost disabled:cursor-not-allowed hover:text-sky-500 transition-colors duration-200 ease-out`}
    >
      <BiRepost className={`w-7 h-7`} /> {data.total}
    </button>
  );
};

export default ButtonRepost;
