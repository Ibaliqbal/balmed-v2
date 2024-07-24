import PostCard from "@/components/post/post-card";
import TrendsCard from "@/components/trends/trends-card";
import { Trend } from "@/types/trends";
import Link from "next/link";
import React from "react";
import { FaCommentDots } from "react-icons/fa";
import TrnedsPostView from "./trends-post-view";

const TrendsView = ({ trends }: { trends: Trend[] | null }) => {
  return (
    <section className="pt-4">
      <div className="p-2 border-b-2 border-slate-700 px-3">
        <h1 className="text-2xl font-bold">Trends for you</h1>
        <ul className="mt-4 w-full flex flex-col gap-3 mb-5">
          {trends
            ?.sort((a, b) => (b.posts.length || 0) - (a.posts.length || 0))
            .slice(0, 10)
            .map((trend, i) => (
              <li key={i}>
                <TrendsCard {...trend} />
              </li>
            ))}
        </ul>
        <Link className="text-blue-600 text-lg font-semibold" href={"/trends"}>
          Show more
        </Link>
      </div>
      <div className="mt-5 flex flex-col gap-6 px-3">
        {trends
          ?.sort((a, b) => (b.posts.length || 0) - (a.posts.length || 0))
          .slice(0, 10)
          .map((trend, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 px-4">
                <FaCommentDots className="w-5 h-5 text-blue-500" />
                <h1 className="text-xl">{trend.content}</h1>
              </div>
              <TrnedsPostView posts={trend.posts} id={trend.id} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default TrendsView;
