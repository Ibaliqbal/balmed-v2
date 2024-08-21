import CustomImage from "../ui/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { User } from "@/types/user";

type Props = Pick<User, "username" | "name" | "photo"> & {
  id: string;
};

const NotificationFollowCard = ({ name, photo, username, id }: Props) => {
  return (
    <article className="w-full flex items-center justify-between p-2">
      <div className="flex itmes-center gap-4">
        <CustomImage
          src={
            photo
              ? photo.url
              : `https://ui-avatars.com/api/?name=${username}&background=random&color=fff`
          }
          alt={"Avatar"}
          width={50}
          height={50}
          className="rounded-full w-[60px] aspect-square object-cover object-center basis-1/2"
        />
        <div className="flex flex-col text-sm grow gap-2">
          <div className="flex items-center gap-2">
            <h2 className="line-clamp-1 break-all">{name}</h2>
            <h2 className="line-clamp-1 break-all">@{username}</h2>
          </div>
          <p>{username} start following you, see more information</p>
        </div>
      </div>
      <button aria-label="More information" className="text-2xl">
        <MdKeyboardArrowRight />
      </button>
    </article>
  );
};

export default NotificationFollowCard;
