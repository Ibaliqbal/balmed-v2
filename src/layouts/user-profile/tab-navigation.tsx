"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TabNavigation = ({ username }: { username: string }) => {
  const pathname = usePathname();

  const lists = [
    {
      title: "Post",
      href: `/${encodeURIComponent(username)}`,
    },
    {
      title: "Replies",
      href: `/${encodeURIComponent(username)}/with_replies`,
    },
    {
      title: "Media",
      href: `/${encodeURIComponent(username)}/medias`,
    },
    {
      title: "Likes",
      href: `/${encodeURIComponent(username)}/likes`,
    },
  ];

  return (
    <div className={`grid grid-cols-4 mt-4 border-b-2 border-b-slate-700`}>
      {lists.map((list) => (
        <div
          className="w-full flex items-center justify-center"
          key={list.title}
        >
          <Link
            href={list.href}
            className={`h-full py-5 px-3 cursor-pointer ${
              list.href === pathname ? "border-b-[3px] border-b-sky-600" : ""
            }`}
          >
            {list.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;
