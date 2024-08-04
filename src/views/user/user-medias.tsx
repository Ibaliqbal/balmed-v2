"use client";
import instance from "@/libs/axios/instance";
import { MediaPreview } from "@/types/media";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import CustomImage from "@/components/ui/image";
import Loading from "@/components/loading";

const UserMedias = ({ id }: { id: string | UUID }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["post", `user-${id}`, "medias"],
    queryFn: async () =>
      (await instance.get(`/api/users/${id}/medias`)).data?.medias,
    enabled: !!id,
  });

  return (
    <section className="pt-8 px-3 grid grid-cols-3 gap-2 pb-10">
      {isLoading ? (
        <Loading />
      ) : (
        data.map((media: MediaPreview, i: number) =>
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
        )
      )}
    </section>
  );
};

export default UserMedias;
