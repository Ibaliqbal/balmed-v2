"use client";
import instance from "@/libs/axios/instance";
import { MediaPreview } from "@/types/media";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import Image from "next/image";
import React from "react";
import { LuLoader2 } from "react-icons/lu";

const UserMedias = ({ id }: { id: string | UUID }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["post", `user-${id}`, "medias"],
    queryFn: async () =>
      (await instance.get(`/api/users/${id}/medias`)).data?.medias,
    enabled: !!id,
  });


  return (
    <section className="pt-8 px-3 grid grid-cols-3 gap-2">
      {isLoading ? (
        <div className="w-full items-center justify-center flex col-span-3">
          <LuLoader2 className="text-white w-5 h-5 animate-spin " />
        </div>
      ) : (
        data.map((media: MediaPreview, i: number) => (
          <Image
            key={i}
            src={media.url}
            alt={"medias"}
            width={700}
            height={700}
            loading={"lazy"}
            className="w-full object-cover object-center rounded-lg aspect-[1/.9] cursor-pointer hover:scale-95 transition-transform duration-200 ease-in-out"
          />
        ))
      )}
    </section>
  );
};

export default UserMedias;
