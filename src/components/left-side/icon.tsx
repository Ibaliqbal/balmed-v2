"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  text: string;
  active: React.ReactElement;
  inActive: React.ReactElement;
};

const Icon = ({ href, text, active, inActive }: Props) => {
  const pathname = usePathname();

  return (
    <Link href={href} className="flex items-center gap-2 text-xl">
      {pathname === href ? active : inActive}
      <p>{text}</p>
    </Link>
  );
};

export default Icon;
