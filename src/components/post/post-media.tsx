import { MediaPreview } from "@/types/media";
import Image from "next/image";
import React from "react";

const PostMedia = ({ media }: { media: MediaPreview[] }) => {
  return (
    <div
      className={`w-full mt-4 ${
        media.length && media.length > 1 ? "grid grid-cols-2 gap-1" : ""
      }`}
    >
      {media.length > 4
        ? media.splice(0, 4).map((m, index) =>
            index === 3 ? (
              m?.url.split(".").find((str: string) => str.includes("mp4")) ? (
                <div
                  key={index}
                  className="relative group cursor-pointer hover:scale-95 transition-transform duration-200 ease-in-out rounded-lg"
                >
                  <video
                    className={`w-full aspect-[1/.9] object-contain rounded-xl object-center`}
                    controls
                  >
                    <source src={m?.url} type="video/mp4" />
                  </video>
                  <div className="w-full h-full font-semibold text-xl inset-0 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in bg-black bg-opacity-60 text-white grid place-items-center">
                    +{media.length - 4}
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="relative group cursor-pointer hover:scale-95 transition-transform duration-200 ease-in-out rounded-lg"
                >
                  <Image
                    src={m.url}
                    alt={"bg"}
                    width={700}
                    height={700}
                    loading={"eager"}
                    className="w-full object-cover object-center rounded-lg aspect-[1/.9]"
                  />
                  <div className="w-full h-full font-semibold text-xl inset-0 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in bg-black bg-opacity-60 text-white grid place-items-center">
                    +{media.length - 4}
                  </div>
                </div>
              )
            ) : m?.url.split(".").find((str: string) => str.includes("mp4")) ? (
              <video
                key={index}
                className={`w-full aspect-[1/.9] object-contain rounded-xl object-center`}
                controls
              >
                <source src={m?.url} type="video/mp4" />
              </video>
            ) : (
              <Image
                key={index}
                src={m.url}
                alt={"bg"}
                width={700}
                height={700}
                loading={"lazy"}
                className="w-full object-cover object-center rounded-lg aspect-[1/.9] cursor-pointer hover:scale-95 transition-transform duration-200 ease-in-out"
              />
            )
          )
        : media.map((m, index) =>
            m?.url.split(".").find((str: string) => str.includes("mp4")) ? (
              <video
                key={index}
                className={`w-full aspect-[1/.9] object-contain rounded-xl object-center`}
                controls
              >
                <source src={m?.url} type="video/mp4" />
              </video>
            ) : (
              <Image
                key={index}
                src={m.url}
                alt={"bg"}
                width={700}
                height={700}
                loading={"lazy"}
                className="w-full object-cover object-center rounded-lg aspect-[1/.9] cursor-pointer hover:scale-95 transition-transform duration-200 ease-in-out"
              />
            )
          )}
    </div>
  );
};

export default PostMedia;
