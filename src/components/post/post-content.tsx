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
            href={`/${str}`}
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
        ) : str.startsWith("https") || str.startsWith("http") ? (
          <a
            href={str}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 z-50"
            key={i}
            onClick={(e) => e.stopPropagation()}
          >
            {str}{" "}
          </a>
        ) : str.includes(".") ? (
          <a
            href={`https://${str}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 z-50"
            key={i}
            onClick={(e) => e.stopPropagation()}
          >
            {str}{" "}
          </a>
        ) : (
          `${str} `
        )
      )}
    </p>
  );
};

export default Content;
