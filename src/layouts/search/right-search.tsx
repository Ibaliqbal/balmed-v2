import { getRandomStartData } from "@/actions/util";
import TrendsCard from "@/components/trends/trends-card";
import UserCard from "@/components/user/user-card";
import { supabase } from "@/libs/supabase/init";
import { limitTrends, limitUser } from "@/utils/constant";
import { getServerSession } from "next-auth";
import Link from "next/link";

const RightSearch = async () => {
  const session = await getServerSession();

  const startUser = await getRandomStartData(limitUser, "users");

  const startTrends = await getRandomStartData(limitTrends, "hastags");

  const { data: users } = await supabase
    .from("users")
    .select(
      `name, username, photo, bio, id, header_photo, followings:follow!follow_user_id_fkey(count), followers:follow!follow_follow_to_fkey (count)`
    )
    .not("email", "eq", session?.user.email as string)
    .range(startUser, startUser + limitUser);

  const { data: trends } = await supabase
    .from("hastags")
    .select()
    .range(startTrends, limitTrends + startTrends);

  return (
    <section className="relative w-full lg:block">
      <main className="p-4 text-white">
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
      </main>
    </section>
  );
};

export default RightSearch;
