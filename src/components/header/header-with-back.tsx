"use client";
import BaseHeader from "./base-header";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const HeaderWithBack = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <BaseHeader>
      <nav className="flex gap-8 py-4 px-3 items-center w-full navbar-home border-b-2 border-slate-700 border-x-2">
        <IoIosArrowRoundBack
          className="w-12 h-12 cursor-pointer"
          onClick={() => router.back()}
        />
        {children}
      </nav>
    </BaseHeader>
  );
};

export default HeaderWithBack;
