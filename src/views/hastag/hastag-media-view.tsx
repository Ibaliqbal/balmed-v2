"use client";
import { getMediaPostsByHastag } from "@/actions/post";
import Loading from "@/components/loading";
import CustomImage from "@/components/ui/image";
import EmptyPosts from "@/layouts/empty-posts";
import { MediaPreview } from "@/types/media";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { motion } from "framer-motion";

const HastagMediaView = ({
  id,
  hastag,
  postsId,
}: {
  id: string;
  hastag: string;
  postsId: string[];
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["post", `hastag-${id}`, "medias"],
    queryFn: async () => await getMediaPostsByHastag(postsId),
  });

  return isLoading ? (
    <Loading />
  ) : data?.length ?? 0 > 0 ? (
    <section className="pt-8 px-3 grid grid-cols-3 gap-2 pb-12">
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
            transition={{
              duration: 0.6,
              ease: "backInOut",
              type: "tween",
              delay: 0.2 * i,
            }}
            key={i}
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
        There are no posts using the hashtag {hastag},{" "}
        <Link href={"/trends"} className="text-blue-600">
          look for the trends you want now
        </Link>
      </h1>
    </EmptyPosts>
  );
};

export default HastagMediaView;
