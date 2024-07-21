import Search from "@/components/form/form-search";
import UserCard from "@/components/user/user-card";
import Link from "next/link";
import React from "react";

const RightExplore = () => {
  return (
    <section className="w-full">
      <header className="w-full sticky md:top-0 z-10">
        <div className="py-2 px-3">
          <Search />
        </div>
      </header>
      <main className="pt-4 mt-4 text-white">
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

export default RightExplore;