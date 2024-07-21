import Search from "@/components/form/form-search";
import { dateFormat } from "@/utils/helpers";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

const RightPeople = () => {
  return (
    <section className="w-full">
      <header className={`w-full md:sticky md:top-0 z-10`}>
        <div className="py-2 px-3">
          <Search />
        </div>
      </header>
      <main className="pt-4 mt-4 text-white">
        <section
          className={`w-full p-5 border-2 border-slate-800 rounded-3xl mt-4`}
        >
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
          <Link
            className="text-blue-600 text-lg font-semibold"
            href={"/trends"}
          >
            Show more
          </Link>
        </section>
      </main>
    </section>
  );
};

export default RightPeople;
