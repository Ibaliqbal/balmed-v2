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
  IoNotificationsOutline,
  IoMail,
} from "react-icons/io5";
import ButtonLogout from "@/components/button/button-logout";
import ButtonPost from "@/components/button/button-post";
import Icon from "@/components/left-side/icon";
import { getServerSession } from "next-auth";
import { getUserLogin } from "@/libs/supabase/function";
import { getCountNotifications } from "@/actions/notification";

const LeftSide = async () => {
  const session = await getServerSession();
  const user = await getUserLogin((session?.user.email as string) ?? " ");
  const countNotif = await getCountNotifications();

  return (
    <aside className="w-full p-4 lg:flex hidden flex-col items-start gap-8 h-dvh col-span-2 sticky top-0 z-[61]">
      <nav className="flex-col grow h-full w-full items-start flex gap-10">
        <h1 className="text-xl font-bold">BM</h1>
        <Icon
          href="/home"
          text="Home"
          active={<IoHome />}
          inActive={<IoHomeOutline />}
        ></Icon>
        <Icon
          href="/explore"
          text="Explore"
          active={<IoSearchOutline />}
          inActive={<IoSearchOutline />}
        ></Icon>
        {session ? (
          <>
            <div className="relative">
              <Icon
                href="/notification"
                text="Notifactions"
                active={<IoNotifications />}
                inActive={<IoNotificationsOutline />}
              />
              {!!countNotif ? (
                <div className="w-5 h-5 text-center text-xs bg-red-600 rounded-full absolute -top-1 -left-2">
                  {countNotif}
                </div>
              ) : null}
            </div>
            <p className="flex items-center gap-2 text-xl cursor-not-allowed">
              <IoMail />
              Message
            </p>
            <Icon
              href="/bookmarks"
              text="Bookmarks"
              active={<FaBookmark />}
              inActive={<FaRegBookmark />}
            ></Icon>
            <Icon
              text="Profile"
              href={`/${encodeURIComponent(user.data.username)}`}
              active={<FaUser />}
              inActive={<FaRegUser />}
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
