import { supabase } from "@/libs/supabase/init";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();

  if (!session)
    return Response.json(
      { message: "Unautorized" },
      { status: 401, statusText: "Unautorized" }
    );

  const { data, error } = await supabase
    .from("users")
    .select(
      `*, likes:likes (post_id, id), bookmarks:bookmarks (post_id, id), reposts:reposts (post_id, id), followings:follow!follow_user_id_fkey(follow_to, id), followers:follow!follow_follow_to_fkey (user_id, id)`
    )
    .eq("email", session?.user.email)
    .single();

  if (error)
    return Response.json(
      { message: "Internal server error please try again" },
      { status: 500, statusText: "Internal server error" }
    );

  return Response.json({ user: data }, { status: 200, statusText: "OK" });
}
