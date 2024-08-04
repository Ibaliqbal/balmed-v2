import Image from "next/image";
import UserTooltip from "./user-tooltip";
import ButtonFollow from "../button/button-follow";
import { User } from "@/types/user";
import { Count } from "@/types/post";
import Link from "next/link";

type Props = Pick<User, "username" | "bio" | "photo" | "name" | "id"> & {
  followings: Count[];
  followers: Count[];
};

const UserCard = ({
  bio,
  followers,
  followings,
  name,
  photo,
  username,
  id,
}: Props) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex itmes-center gap-4">
        <UserTooltip
          {...{ bio, username, name, photo, followers, followings, id }}
        >
          <Image
            src={
              photo
                ? photo.url
                : `https://ui-avatars.com/api/?name=${username}&background=random&color=fff`
            }
            alt={"Avatar"}
            width={50}
            height={50}
            loading={"lazy"}
            className="rounded-full w-[50px] h-[50px] object-cover object-center"
          />
        </UserTooltip>
        <div className="flex flex-col text-sm flex-grow gap-2">
          <UserTooltip
            {...{ bio, username, name, photo, followers, followings, id }}
          >
            <Link
              href={`/${encodeURIComponent(username)}`}
              className="line-clamp-1 break-all"
            >
              {name}
            </Link>
          </UserTooltip>
          <UserTooltip
            {...{ bio, username, name, photo, followers, followings, id }}
          >
            <Link
              href={`/${encodeURIComponent(username)}`}
              className="line-clamp-1 break-all"
            >
              @{username}
            </Link>
          </UserTooltip>
        </div>
      </div>
      <ButtonFollow className="bg-slate-800 px-6 py-3" id={id} />
    </div>
  );
};

export default UserCard;
