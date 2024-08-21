"use client";
import * as React from "react";
import CustomImage from "../ui/image";
import { User } from "@/types/user";
import Modal from "../ui/modal";
import { motion } from "framer-motion";
import { Count } from "@/types/post";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { signOut } from "next-auth/react";

const ButtonPopupProfile = ({
  user,
}: {
  user: User & {
    followings: Count[];
    followers: Count[];
  };
}) => {
  const [openModalProfile, setOepnModalProfile] = React.useState(false);

  const childrenAnimte = {
    open: {
      translateX: -600,
    },
    enter: (i: number) => ({
      translateX: 0,
      transition: {
        duration: 0.65,
        delay: 0.5 + i * 0.2,
        type: "tween",
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    closed: (i: number) => ({
      translateX: -600,
      transition: {
        duration: 0.5,
        delay: 0.5 * i * 0.2,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  };

  return (
    <>
      <CustomImage
        src={
          user?.photo
            ? user?.photo.url
            : `https://ui-avatars.com/api/?name=${user?.username}&background=random&color=fff`
        }
        alt={"Avatar"}
        width={50}
        height={50}
        onClick={() => setOepnModalProfile(true)}
        className="rounded-full md:w-[50px] md:h-[50px] object-cover object-center mt-2 mr-5"
      />
      <Modal open={openModalProfile} setOpen={setOepnModalProfile}>
        <motion.div
          initial={{ translateX: -600 }}
          animate={{
            translateX: 0,
            transition: {
              duration: 0.3,
              type: "tween",
              ease: [0.215, 0.61, 0.355, 1],
            },
          }}
          exit={{
            translateX: -600,
            transition: {
              delay: 0.8,
              ease: [0.215, 0.61, 0.355, 1],
              type: "tween",
            },
          }}
          className="fixed w-4/5 h-dvh px-5 py-10 inset-0 bg-white bg-opacity-75 z-[70] text-black"
        >
          <div className="flex flex-col h-full">
            <div className="flex flex-grow flex-col gap-4">
              <motion.div
                variants={childrenAnimte}
                initial="open"
                animate="enter"
                exit="closed"
                custom={0}
              >
                <CustomImage
                  src={
                    user?.photo
                      ? user?.photo.url
                      : `https://ui-avatars.com/api/?name=${user?.username}&background=random&color=fff`
                  }
                  alt={"Avatar"}
                  width={70}
                  height={70}
                  className="rounded-full md:w-[50px] md:h-[50px] object-cover object-center"
                />
              </motion.div>
              <div className="flex flex-col gap-2">
                <motion.h2
                  variants={childrenAnimte}
                  initial="open"
                  animate="enter"
                  exit="closed"
                  custom={1}
                  className="text-3xl"
                >
                  {user?.name}
                </motion.h2>
                <motion.h2
                  variants={childrenAnimte}
                  initial="open"
                  animate="enter"
                  exit="closed"
                  custom={2}
                  className="text-gray-800 text-lg"
                >
                  @{user?.username}
                </motion.h2>
                <div className="flex items-center gap-4 text-sm">
                  <motion.p
                    variants={childrenAnimte}
                    initial="open"
                    animate="enter"
                    exit="closed"
                    custom={3}
                  >
                    Followings {user?.followings[0].count}
                  </motion.p>
                  <motion.p
                    variants={childrenAnimte}
                    initial="open"
                    animate="enter"
                    exit="closed"
                    custom={4}
                  >
                    Followers {user?.followers[0].count}
                  </motion.p>
                </div>
              </div>
              <motion.p
                variants={childrenAnimte}
                initial="open"
                animate="enter"
                exit="closed"
                custom={5}
              >
                <Link
                  href={`/${encodeURIComponent(user?.username)}`}
                  className="flex items-center gap-2 text-xl mt-4"
                >
                  <FaUser />
                  <p>Profile</p>
                </Link>
              </motion.p>
            </div>
            <motion.button
              variants={childrenAnimte}
              initial="open"
              animate="enter"
              exit="closed"
              custom={6}
              className="bg-red-600 font-bold py-4 w-full rounded-md justify-self-end"
              onClick={() => signOut()}
            >
              Logout
            </motion.button>
          </div>
        </motion.div>
      </Modal>
    </>
  );
};

export default ButtonPopupProfile;
