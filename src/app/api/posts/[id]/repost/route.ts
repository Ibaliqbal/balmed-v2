import { supabase } from "@/libs/supabase/init";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
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

  return Response.json({ data: initData }, { status: 200 });
}
