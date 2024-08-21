"use client";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const EmojiSelect = ({ onEmojiSelect }: { onEmojiSelect: Function }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Added state to check if component is mounted

  useEffect(() => {
    setIsMounted(true); // Set to true after component is mounted
  }, []);

  return (
    <div className="relative">
      <MdOutlineEmojiEmotions
        className="text-2xl cursor-pointer"
        aria-label="button-emoji"
        onClick={() => setOpenModal((prev) => !prev)}
      />
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              type: "tween",
            }}
            className="absolute z-50 left-1/2 -translate-x-1/4 lg:-translate-x-1/2"
          >
            <EmojiPicker onEmojiClick={(obj) => onEmojiSelect(obj.emoji)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmojiSelect;
