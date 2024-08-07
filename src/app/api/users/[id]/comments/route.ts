import { supabase } from "@/libs/supabase/init";
import { limitPost } from "@/utils/constant";
import { queryPosting } from "@/utils/helpers";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const page = Number(req.nextUrl.searchParams.get("page")) || 0;
  const { data: reposts } = await supabase
    .from("reposts")
    .select(`post_id`)
    .eq("user_id", params.id);

  const { data, error, count } = await supabase
    .from("postings")
    .select(queryPosting, { count: "exact" })
    .or(
      `creator_id.eq.${params.id}, id.in.(${
        reposts?.map((post) => post.post_id) as string[]
      })`
    )
    .not("comment_id", "is", null)
    .order("upload_at", { ascending: false })
    .range(page, page + limitPost);

  if (error)
    return Response.json(
      { message: "Something went wrong in server", posts: [] },
      { status: 400, statusText: "Bad request" }
    );

  return Response.json({ data, max: count }, { status: 200, statusText: "OK" });
}
