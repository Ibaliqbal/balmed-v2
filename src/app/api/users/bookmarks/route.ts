import { supabase } from "@/libs/supabase/init";
import { queryPosting } from "@/utils/helpers";
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
    .select(queryPosting)
    .in("id", likes?.bookmarks.map((mark) => mark.post_id) as string[])
    .order("upload_at", { ascending: false });

  if (error)
    return Response.json(
      { message: "Something went wrong in server", posts: [] },
      { status: 400, statusText: "Bad request" }
    );

  return Response.json({ posts: data }, { status: 200, statusText: "OK" });
}
