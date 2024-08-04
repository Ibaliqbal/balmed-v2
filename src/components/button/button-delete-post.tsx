"use client";
import { FaTrash } from "react-icons/fa";
import { UUID } from "crypto";

type Props = {
  id: string | UUID;
};

const ButtonDeletePost = ({ id }: Props) => {
  return (
    <button className="hover:text-red-600 duration-200 transition-colors ease-out">
      <FaTrash className="w-5 h-5" />
    </button>
  );
};

export default ButtonDeletePost;
