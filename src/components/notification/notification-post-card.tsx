import React from "react";
import CustomImage from "../ui/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Post } from "@/types/post";
import { User } from "@/types/user";

type Props = Pick<Post, "content" | "id"> &
  Pick<User, "username" | "name" | "photo"> & {
    type: string;
    owner_id: string;
    usernameLogin: string;
  };

const NotificationPostCard = ({
  username,
  photo,
  name,
  type,
  content,
  usernameLogin,
}: Props) => {
  const msgComment = "meninggalkan komentar di postingan anda";
  const msgMention = "menyebut anda di sebuah post";
  const msgLike = "menyukai postingan anda";

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
          className="rounded-full w-[50px] aspect-square object-cover object-center basis-1/4"
        />
        <div className="flex flex-col text-sm grow gap-3">
          <div className="flex items-center gap-2">
            <h2 className="line-clamp-1 break-all">{name}</h2>
            <h2 className="line-clamp-1 break-all">@{username}</h2>
          </div>
          <p>
            {username}{" "}
            {type === "mention"
              ? msgMention
              : type === "like"
              ? msgLike
              : msgComment}
            , lihat informasi selengkapnya
          </p>
          {type === "mention" ? (
            <div className="w-full p-2 bg-slate-700 bg-opacity-40 rounded-md">
              <p>
                {content.split(" ").map((str, i) =>
                  str.startsWith("@") && str === `@${usernameLogin}` ? (
                    <span className="bg-sky-500/40" key={i}>
                      {str}{" "}
                    </span>
                  ) : (
                    `${str} `
                  )
                )}
              </p>
            </div>
          ) : (
            <div className="w-full p-2 bg-slate-700 bg-opacity-40 rounded-md">
              <p>{content}</p>
            </div>
          )}
        </div>
      </div>
      <button aria-label="More information" className="text-2xl">
        <MdKeyboardArrowRight />
      </button>
    </article>
  );
};

export default NotificationPostCard;
