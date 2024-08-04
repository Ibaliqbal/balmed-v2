"use client";
import { useGetUserLogin } from "@/provider/user-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabNavigation = ({ username }: { username: string }) => {
  const { user } = useGetUserLogin();
  const pathname = usePathname();

  const navigate = [
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
    <div
      className={`grid ${
        username === user?.username ? "grid-cols-4" : "grid-cols-3"
      } mt-4 border-b-2 border-b-slate-700`}
    >
      {username === user?.username
        ? navigate.map((list) => (
            <div
              className="w-full flex items-center justify-center"
              key={list.title}
            >
              <Link
                href={list.href}
                className={`h-full py-5 px-3 cursor-pointer ${
                  list.href === pathname
                    ? "border-b-[3px] border-b-sky-600"
                    : ""
                }`}
              >
                {list.title}
              </Link>
            </div>
          ))
        : navigate
            .filter((list) => list.title !== "Likes")
            .map((list) => (
              <div
                className="w-full flex items-center justify-center"
                key={list.title}
              >
                <Link
                  href={list.href}
                  className={`h-full py-5 px-3 cursor-pointer ${
                    list.href === pathname
                      ? "border-b-[3px] border-b-sky-600"
                      : ""
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
