"use server";
import {
  deleteFile,
  getUrlFile,
  getUserLogin,
  uploadFile,
} from "@/libs/supabase/function";
import { supabase } from "@/libs/supabase/init";
import { MediaPreview } from "@/types/media";
import { randomUUID, UUID } from "crypto";
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
    const { data: existHastag } = await supabase
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

export async function getLikesPost(id: string | UUID) {
  const session = await getServerSession();

  const { data: likes } = await supabase
    .from("postings")
    .select(`id, like:likes!id(count)`)
    .eq("id", id)
    .single();

  const { data: user_likes } = await supabase
    .from("users")
    .select(`id, likes:likes (post_id)`)
    .eq("email", session?.user.email)
    .single();

  const initData = {
    total: likes?.like[0].count,
    isLiked: user_likes?.likes.some((like) => like.post_id === id),
  };

  return initData;
}

export async function getRepostPost(id: string | UUID) {
  const session = await getServerSession();

  const { data: reposts } = await supabase
    .from("postings")
    .select(`id, repost:reposts!id (count)`)
    .eq("id", id)
    .single();

  const { data: user_reposts, error } = await supabase
    .from("users")
    .select(`id,  reposts:reposts (post_id)`)
    .eq("email", session?.user.email)
    .single();

  const initData = {
    total: reposts?.repost[0].count,
    isReposted: user_reposts?.reposts.some((repost) => repost.post_id === id),
  };

  return initData;
}

// export async function deletePost(id: string | UUID) {
//   const result = await supabase
//     .from("postings")
//     .delete()
//     .eq("id", id)
//     .select("id")
//     .single();

//   return result.data;
// }

export async function likePost(id: string | UUID) {
  const session = await getServerSession();

  if (!session)
    return { message: "Please login first", status: false, data: null };
  const { data } = await getUserLogin(session?.user.email as string);
  const { error } = await supabase
    .from("likes")
    .insert({ post_id: id, user_id: data.id });

  if (error)
    return {
      message: "Something went wrong in the server",
      status: false,
      data: null,
    };
}

export async function unlikePost(id: string | UUID) {
  const session = await getServerSession();
  const { data } = await getUserLogin(session?.user.email as string);

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", id)
    .eq("user_id", data.id);

  if (error)
    return {
      message: "Something went wrong in the server",
      status: false,
      data: null,
    };
}

export async function repostPost(id: string | UUID) {
  const session = await getServerSession();

  if (!session)
    return { message: "Please login first", status: false, data: null };
  const { data } = await getUserLogin(session?.user.email as string);

  const { error } = await supabase
    .from("reposts")
    .insert({ post_id: id, user_id: data.id });

  if (error)
    return {
      message: "Something went wrong in the server",
      status: false,
      data: null,
    };
}

export async function unrepostPost(id: string | UUID) {
  const session = await getServerSession();
  const { data } = await getUserLogin(session?.user.email as string);

  const { error } = await supabase
    .from("reposts")
    .delete()
    .eq("post_id", id)
    .eq("user_id", data.id);

  if (error)
    return {
      message: "Something went wrong in the server",
      status: false,
      data: null,
    };
}

export async function bookmarkedPost(id: string | UUID) {
  const session = await getServerSession();

  if (!session)
    return { message: "Please login first", status: false, data: null };
  const { data } = await getUserLogin(session?.user.email as string);

  const { error, data: getBookmark } = await supabase
    .from("bookmarks")
    .insert({ post_id: id, user_id: data.id })
    .select("id, post_id")
    .single();

  if (error)
    return {
      message: "Something went wrong in the server",
      status: false,
      data: null,
    };

  return {
    message: "Successfully bookmark post",
    status: true,
    data: getBookmark,
  };
}

export async function unbookmarkPost(id: string | UUID) {
  const session = await getServerSession();
  const { data } = await getUserLogin(session?.user.email as string);

  const { error, data: getDataBookmark } = await supabase
    .from("bookmarks")
    .delete()
    .eq("post_id", id)
    .eq("user_id", data.id)
    .select("id, post_id")
    .single();

  if (error)
    return {
      message: "Something went wrong in the server",
      status: false,
      data: null,
    };

  return {
    message: "Successfully unbookmark post",
    status: true,
    data: getDataBookmark,
  };
}

export async function getTrendPostsByContent(posts: string[]) {
  const { data, error } = await supabase
    .from("postings")
    .select(
      `*, comment:postings (count), like:likes!id(count), repost:reposts!id(count), creator:users (name, username, photo, bio, id, followers:follow_follow_to_fkey (count), followings:follow_user_id_fkey (count))`
    )
    .in("id", posts)
    .limit(3);

  if (error) return null;

  return data;
}

export async function getCommentPost(id: string | UUID) {
  const { data, error } = await supabase
    .from("postings")
    .select("count")
    .eq("comment_id", id);

  if (error) return { comment: 0 };

  return { comment: data![0].count };
}
export async function uploadComment(input: {
  content: string;
  medias: MediaPreview[];
  id: string | UUID;
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
    const { data: existHastag } = await supabase
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
        comment_id: input.id,
      })
      .select(
        `*, comment:postings (count), like:likes!id(count), repost:reposts!id(count), creator:users (name, username, photo, bio, followers:follow_follow_to_fkey (count), followings:follow_user_id_fkey (count))`
      ),
  ]);
  if (newPost.error) throw new Error("Failed to create new post");

  return newPost.data![0];
}

export async function getPostsByHastag(postsId: string[]) {
  const { data, error } = await supabase
    .from("postings")
    .select(
      `*, comment:postings (count), like:likes!id(count), repost:reposts!id(count), creator:users (name, username, photo, bio, id, followers:follow_follow_to_fkey (count), followings:follow_user_id_fkey (count))`
    )
    .in("id", postsId)
    .order("upload_at", { ascending: false });

  if (error) return [];

  return data;
}
export async function getMediaPostsByHastag(postsId: string[]) {
  const { data, error } = await supabase
    .from("postings")
    .select(`media`)
    .in("id", postsId)
    .order("upload_at", { ascending: false });

  if (error) return [];

  return data.flatMap((data) => data.media);
}

export async function getSearchTop(query: string) {
  const { data, error } = await supabase
    .from("postings")
    .select(
      `*, comment:postings (count), like:likes!id(count), repost:reposts!id(count), creator:users (name, username, photo, bio, id, followers:follow_follow_to_fkey (count), followings:follow_user_id_fkey (count))`
    )
    .or(`content.ilike.%${query}%`)
    .is("comment_id", null)
    .then((data) => {
      data.data?.sort((a, b) => b.like[0].count - a.like[0].count);
      return data;
    });

  if (error) return [];

  return data;
}

export async function getSearchLatest(query: string) {
  const { data, error } = await supabase
    .from("postings")
    .select(
      `*, comment:postings (count), like:likes!id(count), repost:reposts!id(count), creator:users (name, username, photo, bio, id, followers:follow_follow_to_fkey (count), followings:follow_user_id_fkey (count))`
    )
    .or(`content.ilike.%${query}%`)
    .is("comment_id", null)
    .order("upload_at", { ascending: false });

  if (error) return [];

  return data;
}

export async function getSearchMedia(query: string) {
  const { data, error } = await supabase
    .from("postings")
    .select(`media`)
    .or(`content.ilike.%${query}%`)
    .is("comment_id", null);

  if (error) return [];

  return data.flatMap((data) => data.media);
}
