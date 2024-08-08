"use client";
import instance from "@/libs/axios/instance";
import { MediaPreview } from "@/types/media";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import CustomImage from "@/components/ui/image";
import Loading from "@/components/loading";
import EmptyPosts from "@/layouts/empty-posts";
import Link from "next/link";
import { motion } from "framer-motion";

const UserMedias = ({ id }: { id: string | UUID }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["post", `user-${id}`, "medias"],
    queryFn: async () =>
      (await instance.get(`/api/users/${id}/medias`)).data?.medias,
    enabled: !!id,
  });

  return isLoading ? (
    <Loading />
  ) : data.length > 0 ? (
    <section className="pt-5 px-3 grid md:grid-cols-3 grid-cols-2 gap-2 pb-10">
      {data.map((media: MediaPreview, i: number) =>
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
          >
            <video
              className={`w-full aspect-[1/.9] object-contain rounded-xl object-center`}
              controls
            >
              <source src={media?.url} type="video/mp4" />
            </video>
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
      <h1 className="text-xl text-center">
        This user has not media anything yet,{" "}
        <Link href={`/home`} className="text-blue-600">
          Start creating your own post now
        </Link>
      </h1>
    </EmptyPosts>
  );
};

export default UserMedias;
