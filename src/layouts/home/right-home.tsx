import { getRandomStartData } from "@/actions/util";
import Search from "@/components/form/form-search";
import TrendsCard from "@/components/trends/trends-card";
import UserCard from "@/components/user/user-card";
import { supabase } from "@/libs/supabase/init";
import { limitTrends, limitUser } from "@/utils/constant";
import { getServerSession } from "next-auth";
import Link from "next/link";

const RightHome = async () => {
  const session = await getServerSession();

  const startUser = await getRandomStartData(limitUser, "users");
  const startTrends = await getRandomStartData(limitTrends, "hastags");

  const { data: users } = await supabase
    .from("users")
    .select(
      `name, username, photo, bio, id, header_photo, followings:follow_user_id_fkey (count), followers:follow_follow_to_fkey (count)`
    )
    .not("email", "eq", session?.user.email as string)
    .range(startUser, startUser + limitUser);

  const { data: trends } = await supabase
    .from("hastags")
    .select()
    .range(startTrends, limitTrends + startTrends);

  return (
    <section className="w-full lg:block">
      <header className="w-full md:sticky md:top-0 z-10">
        <div className="py-2 px-3">
          <Search />
        </div>
      </header>
      <main className="p-4 mt-4">
        <div className="w-full py-5 pl-5 pr-10 rounded-3xl border-2 border-slate-800">
          <section className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl">Subscribe to premium</h1>
            <p className="text-md">
              Subscribe to unlock new features and if eligible, receive a share
              of ads revenue.
            </p>
            <button className="bg-blue-600 px-4 py-3 rounded-full self-start font-semibold">
              Subscribe
            </button>
          </section>
        </div>
        <section
          className={`w-full p-5 border-2 border-slate-800 rounded-3xl mt-4`}
        >
          <h1 className="text-2xl font-bold">Trends for you</h1>
          <ul className="mt-4 w-full flex flex-col gap-3 mb-5">
            {trends?.map((trend, i) => (
              <li key={i}>
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
        <section className="w-full p-5 rounded-3xl border-2 border-slate-800 mt-4">
          <h1 className="text-2xl font-bold">Who to follow</h1>
          <div className="mt-4 w-full flex flex-col gap-6 mb-5">
            {users?.map((user, i) => (
              <UserCard key={i} {...user} />
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
