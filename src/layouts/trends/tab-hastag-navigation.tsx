"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabNavigation = ({ hastag }: { hastag: string }) => {
  const pathname = usePathname();

  // Add your tab navigation code here
  const navigate = [
    {
      title: "Latest",
      href: `/h/${encodeURIComponent(hastag)}`,
      active: pathname === `/h/${encodeURIComponent(hastag)}`,
    },
    {
      title: "Media",
      href: `/h/${encodeURIComponent(hastag)}/media`,
      active: pathname === `/h/${encodeURIComponent(hastag)}/media`,
    },
  ];
  return (
    <div
      className={`grid grid-cols-${
        navigate.length ? navigate.length : "1"
      } border-b-2 border-x-2 border-slate-700 `}
    >
      {navigate.map((nav, i) => (
        <div
          className="w-full flex items-center justify-center"
          key={nav.title}
        >
          <Link
            href={nav.href}
            className={`h-full py-5 px-3 cursor-pointer ${
              nav.active ? "border-b-[3px] border-b-sky-600" : ""
            }`}
          >
            {nav.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;
