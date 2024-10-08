import { getRandomStartData } from "@/actions/util";
import Search from "@/components/form/form-search";
import UserCard from "@/components/user/user-card";
import { supabase } from "@/libs/supabase/init";
import { limitUser } from "@/utils/constant";
import { getServerSession } from "next-auth";
import Link from "next/link";

const RightTrends = async () => {
  const session = await getServerSession();
  const start = await getRandomStartData(limitUser, "users");
  const { data: users } = await supabase
    .from("users")
    .select(
      `name, username, photo, bio, id, header_photo, followings:follow!follow_user_id_fkey(count), followers:follow!follow_follow_to_fkey (count)`
    )
    .not("email", "eq", session?.user.email as string)
    .range(start, limitUser + start);
  return (
    <section className="w-full">
      <header className="w-full sticky md:top-0 z-10">
        <div className="py-2 px-3">
          <Search />
        </div>
      </header>
      <main className="mt-4">
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

export default RightTrends;
