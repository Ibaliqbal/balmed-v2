"use client";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  IoHome,
  IoHomeOutline,
  IoNotifications,
  IoNotificationsOutline,
  IoSearchOutline,
  IoMail,
} from "react-icons/io5";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { getCountNotifications } from "@/actions/notification";

const NavbarBottom = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState<boolean>(false);
  const [countNotif, setCountNotif] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    async function getNotif() {
      const res = await getCountNotifications();
      setCountNotif(res ?? 0);
    }

    getNotif();
  }, []);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full z-[60] bg-black/55 backdrop-blur-md fixed bottom-0 left-0 border-t-2 border-slate-700 flex lg:hidden items-center justify-between"
    >
      <div className="w-full flex items-center justify-center font-semibold cursor-pointer">
        <Link href={"/home"} className={`h-full py-7 text-2xl`}>
          {pathname === "/home" ? <IoHome /> : <IoHomeOutline />}
        </Link>
      </div>
      <div className="w-full flex items-center justify-center font-semibold cursor-pointer">
        <Link href={"/explore"} className={`h-full py-7 text-2xl`}>
          <IoSearchOutline />
        </Link>
      </div>
      <div className="w-full flex items-center justify-center font-semibold cursor-pointer">
        <Link
          href={"/notification"}
          className={`h-full py-7 text-2xl relative`}
        >
          {pathname === "/notification" ? (
            <IoNotifications />
          ) : (
            <IoNotificationsOutline />
          )}
          {!!countNotif ? (
            <div className="w-5 h-5 text-center text-xs bg-red-600 rounded-full absolute top-5 -left-1">
              {countNotif}
            </div>
          ) : null}
        </Link>
      </div>
      <div className="w-full flex items-center justify-center font-semibold cursor-pointer">
        <p className={`h-full py-7 text-2xl`}>
          <IoMail />
        </p>
      </div>
      <div className="w-full flex items-center justify-center font-semibold cursor-pointer">
        <Link href={"/bookmarks"} className={`h-full py-7 text-2xl`}>
          {pathname === "/bookmarks" ? <FaBookmark /> : <FaRegBookmark />}
        </Link>
      </div>
    </motion.nav>
  );
};

export default NavbarBottom;
