"use server";
import { deleteFile, getUrlFile, uploadFile } from "@/libs/supabase/function";
import { supabase } from "@/libs/supabase/init";
import { MediaPreview } from "@/types/media";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";

export async function uploadPost(input: {
  content: string;
  medias: MediaPreview[];
}) {
  const session = await getServerSession();

  if (!session) throw new Error("Unautorized");

  const { data: userId } = await supabase
    .from("users")
    .select("id")
    .eq("email", session?.user.email)
    .single();

  const id = randomUUID();

  const filterHastags = input.content
    .split(" ")
    .filter((str) => str.startsWith("#"));

  const insertHastags = filterHastags.map(async (hastag) => {
    const { data: existHastag, error } = await supabase
      .from("hastags")
      .select()
      .eq("content", hastag)
      .single();


    if (existHastag) {
      await supabase
        .from("hastags")
        .update({ posts: [...existHastag?.posts, id] })
        .eq("id", existHastag.id);
      return;
    }

    await supabase.from("hastags").insert({ content: hastag, posts: [id] });
    return;
  });

  const [_, newPost] = await Promise.all([
    insertHastags,
    supabase
      .from("postings")
      .insert({
        id,
        content: input.content,
        media: input.medias,
        creator_id: userId?.id,
      })
      .select(
        `*, comment:postings (count), like:likes!id(count), repost:reposts!id(count), creator:users (name, username, photo, bio, followers:follow_follow_to_fkey (count), followings:follow_user_id_fkey (count))`
      ),
  ]);
  if (newPost.error) throw new Error("Failed to create new post");

  return newPost.data![0];
}

export async function uploadFilePost(formData: FormData) {
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
  const result = await deleteFile("postings", path);

  if (result.error === null)
    return { message: "Success delete file", status: true };

  return { message: "Failed delete file", status: false };
}
