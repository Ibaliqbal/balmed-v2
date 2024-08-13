"use client";
import { updateRead } from "@/actions/notification";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";

const NotificationWrapper = ({
  children,
  isRead,
  idNotif,
  idPost,
  username,
  type,
}: {
  children: ReactNode;
  isRead: boolean;
  idNotif: string;
  idPost: string;
  username: string;
  type: string;
}) => {
  const router = useRouter();
  const handleUpdate = async () => {
    const res = await updateRead(idNotif);
    if (res) {
      if (type === "follow") {
        router.push(`/${encodeURIComponent(username)}`);
      } else {
        router.push(`/${encodeURIComponent(username)}/status/${idPost}`);
      }
    } else {
      toast.error("Something went wrong updating");
      return;
    }
  };

  return (
    <div className="relative group cursor-pointer" onClick={handleUpdate}>
      {children}
      {!isRead && (
        <div className="absolute inset-0 w-full h-full bg-white bg-opacity-5 group-hover:bg-opacity-0 rounded-md transition-all duration-200 ease-in-out" />
      )}
    </div>
  );
};

export default NotificationWrapper;
