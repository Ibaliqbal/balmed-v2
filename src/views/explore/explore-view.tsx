import PostCard from "@/components/post/post-card";
import { dateFormat } from "@/utils/helpers";
import Link from "next/link";
import React from "react";
import { FaCommentDots } from "react-icons/fa";

const ExploreView = () => {
  return (
    <section className="pt-4">
      <div className="p-2 border-b-2 border-slate-700 px-3">
        <h1 className="text-2xl font-bold">Trends for you</h1>
        <ul className="mt-4 w-full flex flex-col gap-3 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i}>
              <Link className="flex flex-col gap-2 py-3" href={`/search`}>
                <h4 className="font-bold text-xl">Bola</h4>
                <p className=" font-semibold">10 Posts</p>
                <p className="font-semibold">
                  Trend from {dateFormat("2024-07-19")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <Link className="text-blue-600 text-lg font-semibold" href={"/trends"}>
          Show more
        </Link>
      </div>
      <div className="mt-5 flex flex-col gap-6 px-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="flex items-center gap-3 px-4">
              <FaCommentDots className="w-5 h-5 text-blue-500" />
              <h1 className="text-xl">Bola {i + 1}</h1>
            </div>
            <div className="flex mt-5 flex-col gap-5">
              {/* {Array.from({ length: 3 }).map((_, i) => (
                <PostCard key={i} />
              ))} */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreView;
