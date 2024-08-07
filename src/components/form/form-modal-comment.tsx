"use client";
import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { deleteMedia, uploadFilePost } from "@/actions/post";
import toast from "react-hot-toast";
import { MediaPreview } from "@/types/media";
import { useUploadCommentMutation } from "@/mutations/post-mutation";
import { IoClose } from "react-icons/io5";
import EmojiSelect from "./emoji-selected";
import CustomImage from "../ui/image";
import { offensiveWords } from "@/utils/helpers";

const FormComment = ({ id, username }: { id: string; username: string }) => {
  const [mediasComment, setMediasComment] = useState<MediaPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const { mutate, status } = useUploadCommentMutation(id);

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const content = target.content.value as string;

    if (!content || content.trim() === "") {
      toast.error("Content cannot be empty");
      return;
    }

    if (
      offensiveWords.some((word) => content.toLocaleLowerCase().includes(word))
    ) {
      toast.error("Your post contains offensive content");
      return;
    }

    mutate(
      { content: `${content} @${username}`, medias: mediasComment, id },
      {
        onSuccess: () => {
          toast.success("Post uploaded successfully");
          setValue("");
          setMediasComment([]);
        },
        onError: (error) => {
          console.error(error);
          toast.error("Failed to upload post");
        },
      }
    );
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (file.size > 10000000) {
        toast.error("File size exceeds maximum allowed 10 MB");
        return;
      }

      const formData = new FormData();
      formData.append("bucketName", "postings");
      formData.append("file", file);

      try {
        setIsLoading(true);
        const { status, data, message } = await uploadFilePost(formData);
        if (!status) return toast.error(message);
        setMediasComment((prev) => [
          ...prev,
          { url: data?.url as string, path: data?.path as string },
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteFile = async (path: string) => {
    try {
      setIsLoading(true);
      const { message, status } = await deleteMedia([path]);

      setMediasComment((prev) => prev.filter((media) => media.path !== path));

      if (status) return toast.success(message);

      return toast.error(message);
    } catch (error) {
      setIsLoading(false);
      toast.error("Internal server error please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="grow flex flex-col gap-3" onSubmit={handlePost}>
      <textarea
        placeholder="Text something"
        name="content"
        id=""
        value={value}
        onChange={(e) => setValue(e.target.value)}
        cols={30}
        rows={10}
        className="resize-none border-2 border-slate-700 rounded-lg p-3 custom-scroll-horizontal"
      ></textarea>
      <div className="w-full flex justify-between items-center mt-4">
        <div className="flex items-center gap-4">
          <div>
            <label
              htmlFor="upload_image_comment"
              className="text-2xl cursor-pointer peer-disabled:cursor-not-allowed"
            >
              <FaRegImage />
            </label>
            <input
              type="file"
              className="hidden peer"
              id="upload_image_comment"
              onChange={handleUpload}
            />
          </div>
          <EmojiSelect
            onEmojiSelect={(emoji: string) =>
              setValue((prev) => `${prev} ${emoji}`)
            }
          />
        </div>

        <button
          disabled={isLoading || status === "pending"}
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg disabled:bg-opacity-65 disabled:cursor-not-allowed"
        >
          {isLoading || status === "pending" ? "Process..." : "Post"}
        </button>
      </div>
      <div className="w-full flex gap-2 items-center overflow-x-auto max-w-full custom-scroll-vertical pb-2 mt-3">
        {mediasComment.map((media, i) =>
          media.url.includes("mp4") ? (
            <div className="relative group cursor-pointer" key={i}>
              <video
                className={`w-[100px] h-[100px] object-contain rounded-lg object-center`}
                controls
              >
                <source src={media?.url} type="video/mp4" />
              </video>
              <div className="w-full h-full inset-0 absolute bg-black bg-opacity-60 flex items-center justify-center group-hover:opacity-100 opacity-0 transition-opacity duration-200 ease-out">
                <IoClose
                  className="w-5 h-5 font-bold text-white"
                  aria-label="remove media button"
                  onClick={() => handleDeleteFile(media.path)}
                />
              </div>
            </div>
          ) : (
            <div className="relative group cursor-pointer" key={i}>
              <CustomImage
                src={media.url}
                alt={"bg"}
                width={100}
                height={100}
                className="w-[100px] h-[100px] object-cover object-center rounded-lg"
              />
              <div className="w-full h-full inset-0 absolute bg-black bg-opacity-60 flex items-center justify-center group-hover:opacity-100 opacity-0 transition-opacity duration-200 ease-out">
                <IoClose
                  className="w-5 h-5 font-bold text-white"
                  aria-label="remove media button"
                  onClick={() => handleDeleteFile(media.path)}
                />
              </div>
            </div>
          )
        )}
      </div>
    </form>
  );
};

export default FormComment;
