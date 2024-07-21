import Image from "next/image";
import React from "react";
import ButtonFollow from "../button/button-follow";

type Props = {
  children: React.ReactNode;
};

const UserTooltip = ({ children }: Props) => {
  return (
    <div className="relative cursor-pointer group w-fit">
      {children}
      <div className="w-[300px] h-[230px] z-20 rounded-2xl scale-0 invisible opacity-0 transition-all duration-[600ms] ease-in-out group-hover:visible group-hover:opacity-100 bg-slate-900 bg-opacity-60 text-white absolute left-[50%] -translate-x-[50%] group-hover:scale-100 origin-top flex flex-col justify-between p-5">
        <div className="flex justify-between">
          <Image
            src={"/avatar.jpg"}
            alt={"Avatar"}
            width={70}
            height={70}
            loading={"eager"}
            className="rounded-full w-[60px] h-[60px] object-cover object-center"
          />
          <ButtonFollow className="bg-blue-600 py-3 px-5" />
        </div>
        <div className="flex gap-1 flex-col">
          <div className="flex gap-2 items-center">
            <h4>Iqbal</h4>
            <h4 className="text-gray-500">@Iqbal</h4>
          </div>
          <p>Hello dunia saya</p>
        </div>
        <div className="flex justify-around">
          <p>50 Followers</p>
          <p>20 Following</p>
        </div>
      </div>
    </div>
  );
};

export default UserTooltip;
