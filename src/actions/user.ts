"use server";

import { deleteFile, getUrlFile, uploadFile } from "@/libs/supabase/function";
import { supabase } from "@/libs/supabase/init";
import { MediaPreview } from "@/types/media";
import { getServerSession } from "next-auth";

export async function getAllUser() {
  const session = await getServerSession();
  const { data: users, error } = await supabase
    .from("users")
    .select(
      `name, username, photo, bio, id, followings:follow_user_id_fkey(count), followers:follow_follow_to_fkey (count)`
    )
    .neq("email", session?.user.email);

  if (error) return [];
  return users;
}

export async function getIsFollowing(id: string) {
  const session = await getServerSession();
  const { data } = await supabase
    .from("users")
    .select("id, followings:follow!follow_user_id_fkey(follow_to, id)")
    .eq("email", session?.user.email)
    .single();

  return {
    isFollowing: data?.followings.some(
      (following) => following.follow_to === id
    ),
  };
}

export async function followingAction() {}

export async function uploadFileUser(formData: FormData) {
  const session = await getServerSession();

  if (session) {
    const { data } = await supabase
      .from("users")
      .select("id")
      .eq("email", session?.user.email)
      .single();
    const file = formData.get("file") as File;
    const bucketName = formData.get("bucketName") as string;
    const formatFile = file.type.split("/")[1];
    if (!data) return { message: "User not found", status: false, data: null };

    const res = await uploadFile(
      bucketName,
      file,
      `${data?.id}/${crypto.randomUUID()}.${formatFile}`
    );

    if (!res) return { message: "Error uploading", status: false, data: null };

    const url = await getUrlFile(res.data?.path as string, bucketName);

    return {
      message: "Success",
      status: true,
      data: {
        url: url.publicUrl,
        path: res.data?.path,
      },
    };
  }

  return { message: "unauthorized", status: false, data: null };
}

export async function deleteMedia(path: Array<string>) {
  const result = await deleteFile("avatar", path);

  if (result.error === null)
    return { message: "Success delete file", status: true };

  return { message: "Failed delete file", status: false };
}

export async function updateProfile(data: {
  name: string;
  bio: string;
  location: string;
  web: string;
  avatar: MediaPreview;
  header_photo: MediaPreview;
  id: string;
}) {
  const { avatar, bio, header_photo, location, name, web, id } = data;

  console.log(data);
  // const {} = await supabase
  //   .from("users")
  //   .update({ name, web, location, bio, header_photo, photo: avatar })
  //   .eq("id", id)
  //   .select("name, web, location, bio, photo, header_photo");
}

export async function searchPeople(query: string) {
  const { data: users, error } = await supabase
    .from("users")
    .select(
      `name, username, photo, bio, id, followings:follow_user_id_fkey(count), followers:follow_follow_to_fkey (count)`
    )
    .or(`name.ilike.%${query}%, username.ilike.%${query}%`);

  if (error) return [];

  return users;
}
