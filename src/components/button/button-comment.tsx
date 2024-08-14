"use client";
import { getCommentPost } from "@/actions/post";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import Modal from "../ui/modal";
import { motion } from "framer-motion";
import Link from "next/link";
import FormComment from "../form/form-modal-comment";
import { useParams } from "next/navigation";

type Props = {
  id?: string | UUID;
  total?: number;
  username_creator: string;
  isDetail?: boolean;
};

const ButtonComment = ({ id, total, username_creator, isDetail }: Props) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
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
        disabled={isDetail}
      >
        <FaRegComment className="w-5 h-5" /> {data.comment}
      </button>
      <Modal open={open} setOpen={setOpen}>
        <motion.div
          initial={{ opacity: 0, translateY: 200 }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          exit={{
            opacity: 0,
            translateY: -200,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            type: "tween",
          }}
          className="fixed bg-primary md:max-w-[750px] mx-w-[650px] pb-8 overflow-auto max-h-[700px] h-fit m-auto inset-0 z-[9999] rounded-lg p-3 modal-post border-2 border-white"
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
            <FormComment id={id as string} username={username_creator} />
          </div>
        </motion.div>
      </Modal>
    </>
  );
};

export default ButtonComment;
