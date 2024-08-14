"use client";
import { FormEvent, useEffect, useState } from "react";
import Modal from "../ui/modal";
import { motion } from "framer-motion";
import { useGetUserLogin } from "@/provider/user-provider";
import Loading from "../loading";
import CustomImage from "../ui/image";
import Input from "../ui/input";
import { toast } from "react-hot-toast";
import { MediaPreview } from "@/types/media";
import { FaCamera } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { updateProfile, uploadFileUser } from "@/actions/user";
import { LuLoader2 } from "react-icons/lu";

const ButtonEditProfile = () => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const { user, isLoading } = useGetUserLogin();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<MediaPreview | undefined>(user?.photo);
  const [headerPhoto, setHeaderPhoto] = useState<MediaPreview | undefined>(
    user?.header_photo
  );

  useEffect(() => {
    setAvatar(user?.photo);
    setHeaderPhoto(user?.header_photo);
  }, [user]);

  async function handleEdit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const name = target.name_user.value;
    const bio = target.bio.value;
    const location = target.location.value;
    const web = target.web.value;

    try {
      setLoading(true);
      await updateProfile({
        avatar: avatar as MediaPreview,
        bio,
        header_photo: headerPhoto as MediaPreview,
        location,
        name,
        web,
        id: user?.id as string,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      toast.success("Update data profile successfully");
      window.location.reload();
    }
  }

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isAvatar: boolean
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (file.size > 5000000) {
        toast.error("File size exceeds maximum allowed 5 MB");
        return;
      }

      const formData = new FormData();
      formData.append("bucketName", "avatar");
      formData.append("file", file);

      try {
        setLoading(true);
        const { status, data, message } = await uploadFileUser(formData);
        if (!status) return toast.error(message);
        if (isAvatar) {
          setAvatar({ url: data?.url as string, path: data?.path as string });
        } else {
          console.log("here");
          setHeaderPhoto({
            url: data?.url as string,
            path: data?.path as string,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="">
      <button
        className="bg-slate-800 text-white self-start px-6 py-3 rounded-full font-bold"
        onClick={() => setOpenModalEdit(true)}
      >
        Edit profile
      </button>
      <Modal open={openModalEdit} setOpen={setOpenModalEdit}>
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
          className="fixed bg-primary md:max-w-[750px] mx-w-[450px] pb-8 overflow-auto max-h-[700px] h-fit m-auto inset-0 gap-4 z-[9999] rounded-lg bg-red-400 modal-post custom-scroll-horizontal border-2 border-white"
        >
          {isLoading ? (
            <Loading className="h-[650px]" />
          ) : (
            <>
              <div className="w-full aspect-[1/.5] relative rounded-t-lg">
                <CustomImage
                  src={headerPhoto ? headerPhoto.url : "/example.jpg"}
                  alt={"bg"}
                  width={700}
                  height={700}
                  className="w-full object-cover object-center h-full absolute inset-0 rounded-t-xl"
                />
                <div className="w-full h-full absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center gap-10 text-xl">
                  {loading ? (
                    <LuLoader2 aria-label="loader" className="animate-spin" />
                  ) : (
                    <>
                      <div>
                        <label
                          htmlFor="upload_header"
                          className="cursor-pointer rounded-full hover:bg-black hover:bg-opacity-65 transition-all duration-200 ease-linear p-3 flex items-center justify-center"
                        >
                          <FaCamera aria-label="input-file" />
                        </label>
                        <Input
                          type="file"
                          id="upload_header"
                          className="peer-disabled:cursor-not-allowed hidden"
                          onChange={(e) => handleUpload(e, false)}
                        />
                      </div>
                      <button className="p-3 rounded-full hover:bg-black hover:bg-opacity-65 transition-all duration-200 ease-linear">
                        <IoClose aria-label="delete-btn" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="px-5">
                <figure className="md:w-[200px] w-[150px] h-[150px] md:h-[200px] md:-mt-32 -mt-20 bg-primary rounded-full p-2 flex items-center justify-center relative cover-photo">
                  <CustomImage
                    src={avatar ? avatar.url : "/avatar.jpg"}
                    alt={"Avatar"}
                    fill
                    className="rounded-full object-cover object-center absolute inset-0 w-full h-full"
                  />
                  <div className="w-full h-full absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center gap-2 text-xl rounded-full">
                    <div>
                      <label
                        htmlFor="upload_avatar"
                        className="cursor-pointer rounded-full hover:bg-black hover:bg-opacity-65 transition-all duration-200 ease-linear p-3 flex items-center justify-center"
                      >
                        <FaCamera aria-label="input-file" />
                      </label>
                      <Input
                        type="file"
                        id="upload_avatar"
                        className="peer-disabled:cursor-not-allowed hidden"
                        onChange={(e) => handleUpload(e, true)}
                      />
                    </div>
                    <button className="p-3 rounded-full hover:bg-black hover:bg-opacity-65 transition-all duration-200 ease-linear">
                      <IoClose aria-label="delete-btn" />
                    </button>
                  </div>
                </figure>
                <form className="flex flex-col gap-4" onSubmit={handleEdit}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="Name" className="text-lg">
                      Name
                    </label>
                    <Input
                      type="text"
                      name="name_user"
                      id="Name"
                      className="p-3 border-2 border-slate-700 rounded-lg input-edit"
                      defaultValue={user?.name}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="Bio" className="text-lg">
                      Bio
                    </label>
                    <textarea
                      rows={10}
                      className="resize-none border-2 border-slate-700 rounded-lg p-3 custom-scroll-horizontal"
                      name="bio"
                      id="Bio"
                      defaultValue={user?.bio}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="Location" className="text-lg">
                      Location
                    </label>
                    <Input
                      type="text"
                      name="location"
                      id="Location"
                      className="p-3 border-2 border-slate-700 rounded-lg input-edit"
                      defaultValue={user?.location}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="Web" className="text-lg">
                      Web
                    </label>
                    <Input
                      type="text"
                      name="web"
                      id="Web"
                      className="p-3 border-2 border-slate-700 rounded-lg input-edit"
                      defaultValue={user?.web}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="bg-red-600 font-bold md:hidden w-full py-4 rounded-full text-white self-end disabled:bg-opacity-65 disabled:cursor-not-allowed"
                      type="button"
                      onClick={() => setOpenModalEdit(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-600 font-bold w-full py-4 rounded-full text-white self-end disabled:bg-opacity-65 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Process..." : "Edit"}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </motion.div>
      </Modal>
    </div>
  );
};

export default ButtonEditProfile;
