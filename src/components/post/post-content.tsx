import Link from "next/link";
import React from "react";

const Content = ({ content }: { content: string }) => {
  return (
    <Link
      href={"/"}
      className="whitespace-normal md:tracking-normal tracking-tight line-clamp-5"
    >
      {content?.split(" ").map((str, i) =>
        str.startsWith("@") ? (
          <Link href={"/home"} key={i} className="text-blue-600">
            {str}{" "}
          </Link>
        ) : str.startsWith("#") ? (
          <Link href={"/home"} key={i} className="text-blue-600">
            {str}{" "}
          </Link>
        ) : str.startsWith("https") || str.startsWith("http") ? (
          <a
            href={str}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
            key={i}
          >
            {str}{" "}
          </a>
        ) : (
          `${str} `
        )
      )}
    </Link>
  );
};

export default Content;
