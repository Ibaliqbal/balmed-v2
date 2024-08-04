import { supabase } from "@/libs/supabase/init";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { data, error } = await supabase
    .from("postings")
    .select(
      `*, comment:postings (count), like:likes!id(count), repost:reposts!id(count), creator:users (name, username, photo, bio, id, followers:follow_follow_to_fkey (count), followings:follow_user_id_fkey (count))`
    )
    .eq("comment_id", id)
    .order("upload_at", { ascending: false });
  if (error)
    return Response.json(
      { message: "Internal server error please try again" },
      { status: 500 }
    );
  return Response.json({ posts: data }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const session = await getServerSession();
  if (!session)
    return Response.json({ message: "Unautorized" }, { status: 403 });
}
