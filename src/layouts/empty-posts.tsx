import Image from "next/image";
import { ReactNode } from "react";

const EmptyPosts = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex items-center justify-center h-[80dvh] flex-col gap-6 p-3">
      <Image
        src={"/empty.png"}
        alt="Empty"
        width={500}
        height={500}
        loading="lazy"
      />
      {children}
    </div>
  );
};

export default EmptyPosts;
