"use client";
import { addNotification } from "@/actions/notification";
import React from "react";
import toast from "react-hot-toast";

const ButtonTest = () => {
  const handleAdd = async () => {
    const res = await addNotification();
    if (res) {
      toast.success("Berhasil");
    } else {
      toast.error("Gagal");
    }
  };
  return <button onClick={handleAdd}>add notif</button>;
};

export default ButtonTest;
