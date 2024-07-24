import { Trend } from "@/types/trends";
import { dateFormat } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

type Props = Trend;

const TrendsCard = ({ content, posts, trend_at }: Props) => {
  return (
    <Link className="flex flex-col gap-2 py-3" href={`/search`}>
      <h4 className="font-bold text-xl">{content}</h4>
      <p className=" font-semibold">
        {posts.length} {posts.length > 1 ? "Posts" : "Post"}
      </p>
      <p className="font-semibold">Trend from {dateFormat(trend_at)}</p>
    </Link>
  );
};

export default TrendsCard;
