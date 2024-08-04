import { Count } from "@/types/post";
import { User } from "@/types/user";
import { dateFormat } from "@/utils/helpers";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosLink, IoMdCalendar } from "react-icons/io";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import ButtonEditProfile from "../button/button-edit-profile";
import CustomImage from "../ui/image";

interface Props extends User {
  followings: [Count];
  followers: [Count];
  emailLogin: string;
}

const ProfileCard = ({
  username,
  email,
  emailLogin,
  name,
  followers,
  followings,
  web,
  location,
  joined_at,
  bio,
  photo,
  header_photo,
}: Props) => {
  return (
    <>
      <div className="w-full aspect-[1/.5] relative">
        <CustomImage
          src={header_photo ? header_photo.url : "/example.jpg"}
          alt={"bg"}
          width={700}
          height={700}
          className="w-full object-cover object-center h-full absolute inset-0"
        />
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
            {email === emailLogin ? (
              <ButtonEditProfile />
            ) : (
              <>
                <TbDotsCircleHorizontal className="w-12 h-12 cursor-pointer" />
                <button className="bg-slate-800 text-white self-start px-6 py-3 rounded-full font-bold">
                  Follow
                </button>
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
              {followers[0].count}{" "}
              <span className="text-gray-500">Followers</span>
            </Link>
          </div>
          <p className="text-md text-gray-500">
            Not followed by anyone you{"`"}re following
          </p>
        </article>
      </div>
    </>
  );
};

export default ProfileCard;
