"use client";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const EmojiSelect = ({
  onEmojiSelect,
  isModal,
}: {
  onEmojiSelect: Function;
  isModal: boolean;
}) => {
  const [openModal, setOpenModal] = useState(false);

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
            className={`absolute z-50 ${
              isModal ? "-left-9" : "lg:left-1/2 -left-9 lg:-translate-x-1/2"
            }`}
          >
            <EmojiPicker onEmojiClick={(obj) => onEmojiSelect(obj.emoji)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmojiSelect;
