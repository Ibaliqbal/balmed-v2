import {
  FaBookmark,
  FaRegBookmark,
  FaRegUser,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import {
  IoHome,
  IoHomeOutline,
  IoNotifications,
  IoSearchOutline,
  IoMail,
} from "react-icons/io5";
import ButtonLogout from "@/components/button/button-logout";
import ButtonPost from "@/components/button/button-post";
import Icon from "@/components/left-side/icon";
import { getServerSession } from "next-auth";
import { getUserLogin } from "@/libs/supabase/function";

const LeftSide = async () => {
  const session = await getServerSession();
  const user = await getUserLogin((session?.user.email as string) ?? " ");

  return (
    <aside className="w-full p-4 lg:flex hidden flex-col items-start gap-8 h-dvh col-span-2 sticky top-0 z-50">
      <nav className="flex-col grow h-full w-full items-start flex gap-10 text-white">
        <h1 className="text-xl font-bold">BM</h1>
        <Icon
          href="/home"
          text="Home"
          one={<IoHome />}
          two={<IoHomeOutline />}
        ></Icon>
        <Icon
          href="/explore"
          text="Explore"
          one={<IoSearchOutline />}
          two={<IoSearchOutline />}
        ></Icon>
        {session ? (
          <>
            <p className="flex items-center gap-2 text-xl cursor-not-allowed">
              <IoNotifications />
              Notification
            </p>
            <p className="flex items-center gap-2 text-xl cursor-not-allowed">
              <IoMail />
              Message
            </p>
            <Icon
              href="/bookmarks"
              text="Bookmarks"
              one={<FaBookmark />}
              two={<FaRegBookmark />}
            ></Icon>
            <Icon
              text="Profile"
              href={`/${encodeURIComponent(user.data.username)}`}
              one={<FaUser />}
              two={<FaRegUser />}
            />
          </>
        ) : null}

        <p className="flex items-center gap-2 text-xl cursor-not-allowed">
          <FaUsers />
          Communities
        </p>
        <ButtonPost />
      </nav>
      <ButtonLogout isAuth={session} />
    </aside>
  );
};

export default LeftSide;
