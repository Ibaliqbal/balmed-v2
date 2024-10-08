import { Count } from "@/types/post";
import { User } from "@/types/user";
import { dateFormat } from "@/utils/helpers";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosLink, IoMdCalendar } from "react-icons/io";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import ButtonEditProfile from "../button/button-edit-profile";
import CustomImage from "../ui/image";
import ButtonFollow from "../button/button-follow";
import { supabase } from "@/libs/supabase/init";
import ButtonShareUserProfile from "../button/button-share-user-profile";

interface Props extends User {
  followings: [Count];
  followers: { user_id: string }[];
  userLogin: User & {
    followings: [Count];
    followers: [Count];
  };
}

const ProfileCard = async ({
  username,
  name,
  followers,
  followings,
  web,
  location,
  joined_at,
  bio,
  photo,
  header_photo,
  id,
  userLogin,
}: Props) => {
  const { data } = await supabase
    .from("follow")
    .select("follow_to")
    .eq("user_id", userLogin?.id)
    .then((all) => ({ ...all, data: all.data?.map((user) => user.follow_to) }));

  const peopleFollowersThisUser = new Set(
    followers.map((user) => user.user_id)
  );

  const filterPeopleFollower = data?.filter((user) =>
    peopleFollowersThisUser.has(user)
  );

  const { data: users } = await supabase
    .from("users")
    .select("username")
    .in("id", filterPeopleFollower as string[]);

  return (
    <>
      <div
        className={`w-full aspect-[1/.5] relative ${
          header_photo ? "" : "bg-[#333639]"
        }`}
      >
        {header_photo ? (
          <CustomImage
            src={header_photo.url}
            alt={"bg"}
            width={700}
            height={700}
            className="w-full object-cover object-center h-full absolute inset-0"
          />
        ) : null}
      </div>
      <div className="px-2 pt-4">
        <div className="flex justify-between px-2">
          <div className="md:w-[200px] w-[150px] h-[150px] md:h-[200px] md:-mt-32 -mt-20 bg-primary rounded-full p-2 flex items-center justify-center relative cover-photo">
            <CustomImage
              src={photo ? photo.url : "/avatar.jpg"}
              alt={"Avatar"}
              fill
              className="rounded-full object-cover object-center absolute inset-0 w-full h-full"
            />
          </div>
          <div className="flex gap-4">
            {id === userLogin?.id ? (
              <ButtonEditProfile />
            ) : (
              <>
                <ButtonShareUserProfile username={username} />
                <ButtonFollow className="bg-slate-800 px-6 py-3" id={id} />
              </>
            )}
          </div>
        </div>
        <article className="mt-7 md:pl-2 flex flex-col gap-4">
          <div>
            <h1 className="md:text-6xl text-4xl font-bold">{name}</h1>
            <p className="text-lg text-gray-500">@{username}</p>
          </div>
          <p>{bio}</p>
          <div className="flex items-center gap-5 flex-wrap">
            {location && (
              <p className="text-md text-gray-500 flex items-center gap-1">
                <FaLocationDot className="mr-2" />
                {location}
              </p>
            )}
            <p className="text-md text-gray-500 flex items-center gap-1">
              <IoMdCalendar className="mr-2" />
              Joined {dateFormat(joined_at)}
            </p>
            {web && (
              <p className="text-md text-gray-500 flex items-center gap-1">
                <IoIosLink />
                <a
                  href={web.includes("https") ? web : `https://${web}`}
                  target="_blank"
                  className="text-blue-600"
                >
                  {web}
                </a>
              </p>
            )}
          </div>
          <div className="flex gap-4 text-sm">
            <Link
              href={`/${encodeURIComponent(username)}/followings`}
              className="hover:underline-offset-2 hover:underline"
            >
              {followings[0].count}{" "}
              <span className="text-gray-500">Following</span>
            </Link>
            <Link
              href={`/${encodeURIComponent(username)}/followers`}
              className="hover:underline-offset-2 hover:underline"
            >
              {followers.length}{" "}
              <span className="text-gray-500">Followers</span>
            </Link>
          </div>
          {users?.length ? (
            <p>
              Followed by{" "}
              <Link
                href={`/${encodeURIComponent(users![0].username)}`}
                className="text-blue-600"
              >
                {users![0].username}
              </Link>{" "}
              {users?.length > 1 ? (
                <>
                  and{" "}
                  <Link
                    href={`/${encodeURIComponent(username)}/followers`}
                    className="text-blue-600"
                  >
                    others
                  </Link>
                </>
              ) : null}
            </p>
          ) : (
            <p className="text-md text-gray-500">
              Not followed by anyone you{"`"}re following
            </p>
          )}
        </article>
      </div>
    </>
  );
};

export default ProfileCard;
