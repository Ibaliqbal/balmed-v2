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
      {openModal && ( // Render EmojiPicker only if mounted
        <div className="absolute z-50 ">
          <EmojiPicker onEmojiClick={(obj) => onEmojiSelect(obj.emoji)} />
        </div>
      )}
    </div>
  );
};

export default EmojiSelect;
