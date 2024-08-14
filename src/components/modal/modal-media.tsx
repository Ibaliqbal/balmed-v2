"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../ui/modal";
import { AnimatePresence, motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import CustomImage from "../ui/image";
import { MediaPreview } from "@/types/media";
import { IoClose } from "react-icons/io5";

type Props = {
  media: MediaPreview[];
  initialMedia: string;
  setInitialMedia: Dispatch<SetStateAction<string>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
};

const ModalMedia = ({
  media,
  initialMedia,
  setInitialMedia,
  openModal,
  setOpenModal,
}: Props) => {
  const [direction, setDirection] = useState<"right" | "left">("right");

  const handleNext = () => {
    const findIndex = media.findIndex((data) => data.url === initialMedia);
    setDirection("right");
    if (findIndex === media.length - 1) {
      setInitialMedia(media[0].url);
    } else {
      setInitialMedia(media[findIndex + 1].url);
    }
  };

  const handlePrev = () => {
    const findIndex = media.findIndex((data) => data.url === initialMedia);
    setDirection("left");
    if (findIndex === 0) {
      setInitialMedia(media[media.length - 1].url);
    } else {
      setInitialMedia(media[findIndex - 1].url);
    }
  };
  return (
    <Modal open={openModal} setOpen={setOpenModal}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          type: "tween",
        }}
        className="fixed bg-primary lg:w-[85%] md:w-[95%] w-[95%] pb-8 h-fit m-auto inset-0 z-[9999] rounded-lg bg-black bg-opacity-50 flex flex-col gap-4"
      >
        <div className="self-end mr-5">
          <IoClose
            className="text-3xl cursor-pointer"
            onClick={() => setOpenModal(false)}
          />
        </div>
        <section className="w-full flex justify-between items-center">
          <div
            className="w-12 h-12 flex justify-center items-center bg-gray-700"
            onClick={handlePrev}
          >
            <GoArrowLeft className="cursor-pointer text-xl text-white" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={initialMedia}
              initial={{
                opacity: 0,
                translateX: direction === "right" ? -200 : 200,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              exit={{
                opacity: 0,
                translateX: direction === "right" ? 200 : -200,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                type: "tween",
              }}
              className="flex flex-col gap-3"
            >
              {initialMedia
                .split(".")
                .find((str: string) => str.includes("mp4")) ? (
                <video
                  className={`md:w-[700px] aspect-square w-[500px] object-contain rounded-xl object-center max-h-[70vh] md:max-h-[80vh]`}
                  controlsList="nodownload"
                  src={initialMedia}
                  width={700}
                  height={700}
                  controls
                  autoPlay
                ></video>
              ) : (
                <CustomImage
                  src={initialMedia}
                  alt={"bg"}
                  width={700}
                  height={700}
                  className="object-cover md:w-[700px] aspect-square w-[500px] object-center rounded-lg max-h-[70vh] md:max-h-[80vh]"
                />
              )}
              <a href={initialMedia} target="_blank" rel="noopener noreferrer">
                Open in browser
              </a>
            </motion.div>
          </AnimatePresence>
          <div
            className="flex w-12 h-12 justify-center items-center bg-gray-700"
            onClick={handleNext}
          >
            <GoArrowRight className="cursor-pointer text-xl text-white" />
          </div>
        </section>
      </motion.div>
    </Modal>
  );
};

export default ModalMedia;
