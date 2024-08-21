import { supabase } from "@/libs/supabase/init";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const session = await getServerSession();

  const { data: likes } = await supabase
    .from("postings")
    .select(`id, like:likes!id(count)`)
    .eq("id", id)
    .single();

  const { data: user_likes, error } = await supabase
    .from("users")
    .select(`id, likes:likes (post_id)`)
    .eq("email", session?.user.email)
    .single();

  const initData = {
    total: likes?.like[0].count,
    isLiked: user_likes?.likes.some((like) => like.post_id === id),
  };

  return Response.json({ data: initData }, { status: 200 });
}

// export async function POST
