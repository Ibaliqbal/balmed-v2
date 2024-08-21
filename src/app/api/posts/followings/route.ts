import { supabase } from "@/libs/supabase/init";
import { queryPosting } from "@/utils/helpers";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session)
    return Response.json({ message: "Unautorized" }, { status: 401 });

  const { data: user, error: user_error } = await supabase
    .from("users")
    .select(`id, followings:follow!follow_user_id_fkey(follow_to, id)`)
    .eq("email", session.user.email)
    .single();

  if (user_error)
    return Response.json(
      { message: "User not found", data: [] },
      { status: 400 }
    );

  const { data, error } = await supabase
    .from("postings")
    .select(queryPosting)
    .in(
      "creator_id",
      user.followings.map((follow) => follow.follow_to)
    )
    .is("comment_id", null)
    .order("upload_at", { ascending: false });

  if (error)
    return Response.json(
      { message: "Internal server error please try again", data: [] },
      { status: 500 }
    );
  return Response.json({ posts: data }, { status: 200 });
}
