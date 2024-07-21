import { supabase } from "@/libs/supabase/init";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session)
    return Response.json({ message: "Unautorized" }, { status: 401 });

  const { data: likes } = await supabase
    .from("users")
    .select(`id, bookmarks:bookmarks (post_id)`)
    .eq("email", session.user.email)
    .single();

  const { data, error } = await supabase
    .from("postings")
    .select(
      `*, comment:postings (count), like:likes!id(count), repost:reposts!id(count), creator:users (name, username, photo, bio, followers:follow_follow_to_fkey (count), followings:follow_user_id_fkey (count))`
    )
    .in("id", likes?.bookmarks.map((mark) => mark.post_id) as string[])
    .order("upload_at", { ascending: false });

  if (error)
    return Response.json(
      { message: "Something went wrong in server", posts: [] },
      { status: 400, statusText: "Bad request" }
    );

  return Response.json({ posts: data }, { status: 200, statusText: "OK" });
}
