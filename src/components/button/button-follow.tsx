import React, { PropsWithoutRef } from "react";

const ButtonFollow = ({ className }: { className: string }) => {
  return (
    <button
      className={`${className} text-white self-start rounded-full font-bold disabled:cursor-not-allowed`}
    >
      Follow
    </button>
  );
};

export default ButtonFollow;
