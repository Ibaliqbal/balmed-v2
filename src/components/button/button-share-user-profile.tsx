"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosLink } from "react-icons/io";
import { TbDotsCircleHorizontal } from "react-icons/tb";

const ButtonShareUserProfile = ({ username }: { username: string }) => {
  const [openShareUser, setOpenShareUser] = useState(false);
  return (
    <div className="relative">
      <TbDotsCircleHorizontal
        className="w-12 h-12 cursor-pointer"
        onClick={() => setOpenShareUser((prev) => !prev)}
      />
      <AnimatePresence>
        {openShareUser && (
          <motion.div
            initial={{ scale: 0, transformOrigin: "top right" }}
            exit={{ scale: 0, transformOrigin: "top right" }}
            animate={{
              scale: 1,
              transformOrigin: "top right",
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              type: "tween",
            }}
            className="bg-white text-black shadow-md shadow-black absolute top-6 right-8 text-nowrap px-3 py-2 rounded-md"
          >
            <p
              className="flex items-center gap-2 text-lg cursor-pointer"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_APP_URL}/${encodeURIComponent(
                    username
                  )}`
                );
                toast.success("Copied to clipboard");
                setOpenShareUser(false);
              }}
            >
              <IoIosLink /> Copy link to profile
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ButtonShareUserProfile;
