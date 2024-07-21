import { DataPostUser } from "@/types/user";
import { UUID } from "crypto";
import React from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

type Props = {
  id?: string | UUID;
  isBookmarked?: DataPostUser | undefined;
};

const ButtonBookmark = ({ id, isBookmarked }: Props) => {
  return (
    <button
      className={`disabled:cursor-not-allowed hover:text-yellow-500 transition-colors duration-200 ease-out`}
    >
      {isBookmarked ? (
        <FaBookmark className="w-5 h-5 text-yellow-500" />
      ) : (
        <FaRegBookmark className="w-5 h-5" />
      )}
    </button>
  );
};

export default ButtonBookmark;
