"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabNavigationFollow = ({ user }: { user: string }) => {
  const pathname = usePathname();
  return (
    <div className={`grid grid-cols-2 border-b-2 border-b-slate-700`}>
      <div className="w-full flex items-center justify-center">
        <Link
          href={`/${user}/followings`}
          className={`h-full py-5 px-3 cursor-pointer ${
            `/${user}/followings` === pathname
              ? "border-b-[3px] border-b-sky-600"
              : ""
          }`}
        >
          Followings
        </Link>
      </div>
      <div className="w-full flex items-center justify-center">
        <Link
          href={`/${user}/followers`}
          className={`h-full py-5 px-3 cursor-pointer ${
            `/${user}/followers` === pathname
              ? "border-b-[3px] border-b-sky-600"
              : ""
          }`}
        >
          Followers
        </Link>
      </div>
    </div>
  );
};

export default TabNavigationFollow;
