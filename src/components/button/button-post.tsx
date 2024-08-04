"use client";

import React, { useState } from "react";
import Modal from "../ui/modal";
import { motion } from "framer-motion";
import FormPost from "../form/form-post";
import { useGetUserLogin } from "@/provider/user-provider";
import { useParams, usePathname } from "next/navigation";

const ButtonPost = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useGetUserLogin();
  return (
    <>
      <button
        className="bg-blue-600 font-bold w-full py-4 rounded-full text-white"
        onClick={() => setOpen(true)}
      >
        Post
      </button>
      <Modal open={open} setOpen={setOpen}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            scale: 0,
          }}
          className="fixed bg-primary md:max-w-[750px] mx-w-[650px] pb-8 overflow-auto max-h-[700px] h-fit m-auto inset-0 gap-4 z-[9999] rounded-lg bg-red-400 p-3 modal-post border-2 border-white"
        >
          <h1 className="text-2xl font-bold mb-5">
            Post something do you want
          </h1>
          <FormPost
            id=""
            isComment={false}
            username=""
            queryKey={
              pathname === `/${user?.username}`
                ? ["post", `user-${user?.id}`]
                : ["post", "for-you"]
            }
          />
        </motion.div>
      </Modal>
    </>
  );
};

export default ButtonPost;
