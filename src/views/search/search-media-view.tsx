"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getSearchMedia } from "@/actions/post";
import Loading from "@/components/loading";
import EmptyPosts from "@/layouts/empty-posts";
import Link from "next/link";
import CustomImage from "@/components/ui/image";
import { MediaPreview } from "@/types/media";

const SearchMediaView = ({ query }: { query: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["post", `search-${query}`, "media"],
    queryFn: async () => await getSearchMedia(query),
    enabled: !!query,
  });

  return isLoading ? (
    <Loading />
  ) : data?.length ?? 0 > 0 ? (
    <section className="pt-8 px-3 grid grid-cols-3 gap-2 pb-10">
      {data?.map((media: MediaPreview, i: number) =>
        media.url.includes("mp4") ? (
          <video
            key={i}
            className={`w-full aspect-[1/.9] object-contain rounded-xl object-center`}
            controls
          >
            <source src={media?.url} type="video/mp4" />
          </video>
        ) : (
          <CustomImage
            key={i}
            src={media.url}
            alt={"medias"}
            width={700}
            height={700}
            className="w-full object-cover object-center rounded-lg aspect-[1/.9] cursor-pointer hover:scale-95 transition-transform duration-200 ease-in-out"
          />
        )
      )}
    </section>
  ) : (
    <EmptyPosts>
      <div className="w-full">
        <h1 className="font-bold text-5xl text-center">No result for</h1>
        <p className="font-bold text-4xl text-center">{`"${query}"`}</p>
        <p className="mt-2 text-center">
          Try searching for something else, or check your Search settings to see
          if {"they’re"} protecting you from potentially sensitive content.
        </p>
      </div>
    </EmptyPosts>
  );
};

export default SearchMediaView;
