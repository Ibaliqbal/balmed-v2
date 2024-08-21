import ButtonFollow from "../button/button-follow";
import { Count } from "@/types/post";
import { User } from "@/types/user";
import CustomImage from "../ui/image";

type Props = Pick<
  User,
  "username" | "bio" | "photo" | "name" | "id" | "header_photo"
> & {
  followings: Count[];
  followers: Count[];
  children: React.ReactNode;
};

const UserTooltip = ({
  children,
  bio,
  followers,
  followings,
  name,
  photo,
  username,
  id,
  header_photo,
}: Props) => {
  return (
    <div className="relative cursor-pointer group w-fit">
      {children}
      <div className="w-[300px] h-fit z-[62] rounded-2xl scale-0 invisible opacity-0 transition-all duration-[600ms] ease-in-out group-hover:visible group-hover:opacity-100 bg-slate-900 bg-opacity-70 text-white absolute left-[50%] -translate-x-[50%] group-hover:scale-100 origin-top flex flex-col">
        <CustomImage
          src={header_photo ? header_photo.url : "/example.jpg"}
          alt="Header photo"
          width={300}
          height={10}
          className="rounded-t-2xl w-full aspect-[1/.4] object-cover object-center"
        />
        <div className="p-5 flex flex-col gap-3 h-full">
          <div className="flex justify-between items-start -mt-14">
            <CustomImage
              src={
                photo
                  ? photo.url
                  : `https://ui-avatars.com/api/?name=${username}&background=random&color=fff`
              }
              alt={"Avatar"}
              width={70}
              height={70}
              className="rounded-full w-[60px] h-[60px] object-cover object-center"
            />
            <ButtonFollow className="bg-blue-800 py-3 px-5" id={id} />
          </div>
          <div className="flex gap-1 flex-col">
            <div className="flex gap-2 items-center flex-wrap">
              <h4>{name}</h4>
              <h4 className="text-slate-500">@{username}</h4>
            </div>
            <p className="line-clamp-2">{bio}</p>
          </div>
          <div className="flex justify-around">
            <p>{followers[0].count} Followers</p>
            <p>{followings[0].count} Following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTooltip;
