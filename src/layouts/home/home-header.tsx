"use client";
import BaseHeader from "@/components/header/base-header";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeHeader = () => {
  const pathname = usePathname();

  return (
    <BaseHeader>
      <nav className="grid grid-cols-2 w-full navbar-home border-b-2 border-slate-700 lg:border-x-2">
        <div className="w-full flex items-center justify-center font-semibold cursor-pointer">
          <Link
            href={"/home"}
            className={`h-full py-7 ${
              pathname === "/home" ? "border-b-blue-600 border-b-4" : ""
            }`}
          >
            For You
          </Link>
        </div>
        <div className="w-full flex items-center justify-center font-semibold cursor-pointer">
          <Link
            href={"/following"}
            className={`h-full py-7 ${
              pathname === "/following" ? "border-b-blue-600 border-b-4" : ""
            }`}
          >
            Following
          </Link>
        </div>
      </nav>
    </BaseHeader>
  );
};

export default HomeHeader;
