import Search from "@/components/form/form-search";
import UserCard from "@/components/user/user-card";
import { dateFormat } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

const RightHome = () => {
  return (
    <section className="w-full lg:block">
      <header className="w-full md:sticky md:top-0 z-10">
        <div className="py-2 px-3">
          <Search />
        </div>
      </header>
      <main className="p-4 text-white mt-4">
        <div className="w-full py-5 pl-5 pr-10 rounded-3xl border-2 border-slate-800">
          <section className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl">Subscribe to premium</h1>
            <p className="text-md">
              Subscribe to unlock new features and if eligible, receive a share
              of ads revenue.
            </p>
            <button className="bg-blue-600 px-4 py-3 rounded-full self-start text-white font-semibold">
              Subscribe
            </button>
          </section>
        </div>
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
        <section className="w-full p-5 rounded-3xl border-2 border-slate-800 mt-4">
          <h1 className="text-2xl font-bold">Who to follow</h1>
          <div className="mt-4 w-full flex flex-col gap-6 mb-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <UserCard key={i} />
            ))}
          </div>
          <Link
            className="text-blue-600 text-lg font-semibold"
            href={"/people"}
          >
            Show more
          </Link>
        </section>
      </main>
    </section>
  );
};

export default RightHome;
