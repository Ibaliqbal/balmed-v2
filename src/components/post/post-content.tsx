"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Content = ({
  content,
  id,
  username,
}: {
  content: string;
  username: string;
  id: string;
}) => {
  const router = useRouter();
  return (
    <p
      onClick={() => router.push(`/${username}/status/${id}`)}
      className="whitespace-normal md:tracking-normal tracking-tight line-clamp-5 cursor-pointer"
    >
      {content?.split(" ").map((str, i) =>
        str.startsWith("@") ? (
          <Link
            href={`/${encodeURIComponent(str.replaceAll("@", ""))}`}
            key={i}
            className="text-blue-600 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {str}{" "}
          </Link>
        ) : str.startsWith("#") ? (
          <Link
            href={`/h/${encodeURIComponent(str)}`}
            key={i}
            className="text-blue-600 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {str}{" "}
          </Link>
        ) : (
          `${str} `
        )
      )}
    </p>
  );
};

export default Content;
