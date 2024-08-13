"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TabNavigation = () => {
  const pathname = usePathname();
  const navigate = [
    {
      title: "All",
      href: "/notification",
    },
    {
      title: "Mention",
      href: "/notification/mentions",
    },
  ];
  return (
    <div
      className={`grid grid-cols-${
        navigate.length ?? 1
      } border-b-2 lg:border-x-2 border-slate-700`}
    >
      {navigate
        .filter((list) => list.title !== "Likes")
        .map((list) => (
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
