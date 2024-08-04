import { supabase } from "@/libs/supabase/init";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data: reposts } = await supabase
    .from("reposts")
    .select(`post_id`)
    .eq("user_id", params.id);

  const { data, error } = await supabase
    .from("postings")
    .select(
      `*, comment:postings (count), like:likes!id(count), repost:reposts!id(count), creator:users (name, username, photo, bio, id, followers:follow_follow_to_fkey (count), followings:follow_user_id_fkey (count))`
    )
    .or(
      `creator_id.eq.${params.id}, id.in.(${
        reposts?.map((post) => post.post_id) as string[]
      })`
    )
    .not("comment_id", "is", null)
    .order("upload_at", { ascending: false });

  if (error)
    return Response.json(
      { message: "Something went wrong in server", posts: [] },
      { status: 400, statusText: "Bad request" }
    );

  return Response.json({ posts: data }, { status: 200, statusText: "OK" });
}
