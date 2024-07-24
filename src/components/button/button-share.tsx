"use client";
import { UUID } from "crypto";
import React from "react";
import toast from "react-hot-toast";
import { FaShare } from "react-icons/fa";

const ButtonShare = ({
  id,
  creator_username,
}: {
  id: string | UUID;
  creator_username: string;
}) => {
  return (
    <FaShare
      onClick={async () => {
        await navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_APP_URL}/${creator_username}/status/${id}`
        );
        toast.success("Copied to clipboard");
      }}
      aria-label="button-share"
      className="w-5 h-5 cursor-pointer share hover:text-blue-600 transition-colors duration-200 ease-out"
    />
  );
};

export default ButtonShare;
