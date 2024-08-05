import Search from "@/components/form/form-search";
import TrendsCard from "@/components/trends/trends-card";
import { supabase } from "@/libs/supabase/init";
import { dateFormat } from "@/utils/helpers";
import Link from "next/link";

const RightPeople = async () => {
  const { data: trends } = await supabase.from("hastags").select().limit(10);
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
            {trends?.map((trend, i) => (
              <li key={trend.id}>
                <TrendsCard {...trend} />
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
