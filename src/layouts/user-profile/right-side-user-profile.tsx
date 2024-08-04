import Search from "@/components/form/form-search";
import UserCard from "@/components/user/user-card";
import { supabase } from "@/libs/supabase/init";
import { dateFormat } from "@/utils/helpers";
import { getServerSession } from "next-auth";
import Link from "next/link";

const RightUserProfile = async () => {
  const session = await getServerSession();
  const { data: users, error } = await supabase
    .from("users")
    .select(
      `name, username, photo, bio, id, followings:follow!follow_user_id_fkey(count), followers:follow!follow_follow_to_fkey (count)`
    )
    .not("email", "eq", session?.user.email as string);
  return (
    <section className="w-full lg:block">
      <header className="w-full md:sticky md:top-0 z-10">
        <div className="py-2 px-3">
          <Search />
        </div>
      </header>
      <main className="p-4 text-white mt-4">
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

export default RightUserProfile;
