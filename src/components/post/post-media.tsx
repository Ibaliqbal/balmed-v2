import { MediaPreview } from "@/types/media";
import CustomImage from "../ui/image";
import { motion } from "framer-motion";

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
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "backInOut",
                    type: "tween",
                    delay: 0.2 * index,
                  }}
                  className="relative group cursor-pointer hover:scale-95 transition-transform duration-200 ease-in-out rounded-lg"
                >
                  <video
                    className={`w-full aspect-[1/.9] object-contain rounded-xl object-center`}
                    controlsList="nodownload"
                    src={m?.url}
                    controls
                  ></video>
                  <div className="w-full h-full font-semibold text-lg inset-0 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in bg-black bg-opacity-60 text-white grid place-items-center">
                    +{media.length - 4}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "backInOut",
                    type: "tween",
                    delay: 0.2 * index,
                  }}
                  className="relative group cursor-pointer hover:scale-95 transition-transform duration-200 ease-in-out rounded-lg"
                >
                  <CustomImage
                    src={m.url}
                    alt={"bg"}
                    width={700}
                    height={700}
                    className="w-full object-cover object-center rounded-lg aspect-[1/.9]"
                  />
                  <div className="w-full h-full font-semibold text-xl inset-0 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in bg-black bg-opacity-60 text-white grid place-items-center">
                    +{media.length - 4}
                  </div>
                </motion.div>
              )
            ) : m?.url.split(".").find((str: string) => str.includes("mp4")) ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                }}
                key={index}
                transition={{
                  duration: 0.6,
                  ease: "backInOut",
                  type: "tween",
                  delay: 0.2 * index,
                }}
              >
                <video
                  className={`w-full aspect-[1/.9] object-contain rounded-lg object-center`}
                  controlsList="nodownload"
                  src={m?.url}
                  controls
                ></video>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                }}
                key={index}
                transition={{
                  duration: 0.6,
                  ease: "backInOut",
                  type: "tween",
                  delay: 0.2 * index,
                }}
              >
                <CustomImage
                  src={m.url}
                  alt={"bg"}
                  width={700}
                  height={700}
                  className="w-full object-cover object-center rounded-lg aspect-[1/.9] cursor-pointer hover:scale-95 transition-transform duration-200 ease-in-out"
                />
              </motion.div>
            )
          )
        : media.map((m, index) =>
            m?.url.split(".").find((str: string) => str.includes("mp4")) ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                }}
                key={index}
                transition={{
                  duration: 0.6,
                  ease: "backInOut",
                  type: "tween",
                  delay: 0.2 * index,
                }}
              >
                <video
                  className={`w-full aspect-[1/.9] object-contain rounded-lg object-center`}
                  controlsList="nodownload"
                  controls
                  src={m?.url}
                ></video>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                }}
                key={index}
                transition={{
                  duration: 0.6,
                  ease: "backInOut",
                  type: "tween",
                  delay: 0.2 * index,
                }}
              >
                <CustomImage
                  src={m.url}
                  alt={"bg"}
                  width={700}
                  height={700}
                  className="w-full object-cover object-center rounded-lg aspect-[1/.9] cursor-pointer hover:scale-95 transition-transform duration-200 ease-in-out"
                />
              </motion.div>
            )
          )}
    </div>
  );
};

export default PostMedia;
