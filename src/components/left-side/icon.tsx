"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  href: string;
  text: string;
  one: React.ReactElement;
  two: React.ReactElement;
};

const Icon = ({ href, text, one, two }: Props) => {
  const pathname = usePathname();

  return (
    <Link href={href} className="flex items-center gap-2 text-xl">
      {pathname === href ? one : two}
      <p>{text}</p>
    </Link>
  );
};

export default Icon;
