import React from "react";
import Image from "next/image";
import UserTooltip from "./user-tooltip";
import ButtonFollow from "../button/button-follow";

const UserCard = () => {
  return (
    <div className="w-full flex items-center gap-4">
      <UserTooltip>
        <Image
          src={"/avatar.jpg"}
          alt={"Avatar"}
          width={70}
          height={70}
          loading={"eager"}
          className="rounded-full w-[50px] h-[50px] object-cover object-center"
        />
      </UserTooltip>
      <div className="grow flex flex-col text-sm">
        <UserTooltip>
          <h1>Ibal</h1>
        </UserTooltip>
        <UserTooltip>
          <h1>@Iqbal</h1>
        </UserTooltip>
      </div>
      <ButtonFollow className="bg-slate-800 px-6 py-3" />
    </div>
  );
};

export default UserCard;
