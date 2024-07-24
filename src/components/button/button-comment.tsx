"use client";
import { getCommentPost } from "@/actions/post";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import Modal from "../ui/modal";
import { motion } from "framer-motion";
import FormModalComment from "../form/form-modal-comment";
import Link from "next/link";

type Props = {
  id?: string | UUID;
  total?: number;
  username_creator: string;
};

const ButtonComment = ({ id, total, username_creator }: Props) => {
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["post-comment", id],
    queryFn: async () => await getCommentPost(id as string),
    initialData: { comment: total },
    staleTime: Infinity,
  });

  return (
    <>
      <button
        className="flex items-center gap-2 comment disabled:cursor-not-allowed"
        onClick={() => setOpen(true)}
      >
        <FaRegComment className="w-5 h-5" /> {data.comment}
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
          className="fixed bg-primary md:max-w-[750px] mx-w-[650px] pb-8 overflow-auto max-h-[700px] h-fit m-auto inset-0 z-[9999] rounded-xl bg-red-400 p-3 modal-post border-2 border-white"
        >
          <div>
            <h1 className="text-2xl font-bold mb-5">
              Comment something do you want
            </h1>
            <p className="mb-5">
              Creator post :{" "}
              <Link href={"/"} className="text-blue-600">
                @{username_creator}
              </Link>
            </p>
            <FormModalComment
              id={id as string}
              setOpen={setOpen}
              username={username_creator}
            />
          </div>
        </motion.div>
      </Modal>
    </>
  );
};

export default ButtonComment;
