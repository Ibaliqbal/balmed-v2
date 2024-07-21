import { UUID } from "crypto";
import React from "react";
import { FaRegComment } from "react-icons/fa";

type Props = {
  id?: string | UUID;
  total?: number;
};

const ButtonComment = ({ id, total }: Props) => {
  return (
    <button className="flex items-center gap-2 comment disabled:cursor-not-allowed">
      <FaRegComment className="w-5 h-5" /> {total}
    </button>
  );
};

export default ButtonComment;
