"use client";
import React from "react";
import toast from "react-hot-toast";
import { FaShare } from "react-icons/fa";

const ButtonShare = () => {
  return (
    <FaShare
      onClick={async () => {
        await navigator.clipboard.writeText("https://porto-iqbal.vercel.app");
        toast.success("Copied to clipboard");
      }}
      aria-label="button-share"
      className="w-5 h-5 cursor-pointer share hover:text-blue-600 transition-colors duration-200 ease-out"
    />
  );
};

export default ButtonShare;
