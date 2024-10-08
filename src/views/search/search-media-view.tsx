"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getSearchMedia } from "@/actions/post";
import Loading from "@/components/loading";
import EmptyPosts from "@/layouts/empty-posts";
import CustomImage from "@/components/ui/image";
import { MediaPreview } from "@/types/media";
import { motion } from "framer-motion";
import ModalMedia from "@/components/modal/modal-media";

const SearchMediaView = ({ query }: { query: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["post", `search-${query}`, "media"],
    queryFn: async () => await getSearchMedia(query),
    enabled: !!query,
  });

  const [openModalMediaSearch, setOpenModalMediaSearch] = useState(false);
  const [initialMediaSearch, setInitialMediaSearch] = useState("");

  const handleOpenModal = (url: string) => {
    setInitialMediaSearch(url);
    setOpenModalMediaSearch(true);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : data?.length ?? 0 > 0 ? (
        <section className="pt-8 px-3 grid md:grid-cols-3 grid-cols-2 gap-2 pb-10">
          {data?.map((media: MediaPreview, i: number) =>
            media.url.includes("mp4") ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                }}
                key={i}
                transition={{
                  duration: 0.6,
                  ease: "backInOut",
                  type: "tween",
                  delay: 0.2 * i,
                }}
                onClick={() => handleOpenModal(media.url)}
              >
                <video
                  className={`w-full aspect-[1/.9] object-contain rounded-xl object-center`}
                  controlsList="nodownload"
                  src={media.url}
                  controls
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenModal(media.url);
                  }}
                ></video>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                }}
                key={i}
                transition={{
                  duration: 0.6,
                  ease: "backInOut",
                  type: "tween",
                  delay: 0.2 * i,
                }}
                onClick={() => handleOpenModal(media.url)}
              >
                <CustomImage
                  src={media.url}
                  alt={"medias"}
                  width={700}
                  height={700}
                  className="w-full object-cover object-center rounded-lg aspect-[1/.9] cursor-pointer hover:scale-95 transition-transform duration-200 ease-in-out"
                />
              </motion.div>
            )
          )}
        </section>
      ) : (
        <EmptyPosts>
          <div className="w-full">
            <h1 className="font-bold text-5xl text-center">No result for</h1>
            <p className="font-bold text-4xl text-center">{`"${query}"`}</p>
            <p className="mt-2 text-center">
              Try searching for something else, or check your Search settings to
              see if {"they’re"} protecting you from potentially sensitive
              content.
            </p>
          </div>
        </EmptyPosts>
      )}
      <ModalMedia
        initialMedia={initialMediaSearch}
        setInitialMedia={setInitialMediaSearch}
        media={data as MediaPreview[]}
        openModal={openModalMediaSearch}
        setOpenModal={setOpenModalMediaSearch}
      />
    </>
  );
};

export default SearchMediaView;
