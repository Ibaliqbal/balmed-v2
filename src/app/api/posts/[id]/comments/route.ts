import { supabase } from "@/libs/supabase/init";
import { queryPosting } from "@/utils/helpers";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { data, error } = await supabase
    .from("postings")
    .select(queryPosting)
    .eq("comment_id", id)
    .order("upload_at", { ascending: false });
  if (error)
    return Response.json(
      { message: "Internal server error please try again" },
      { status: 500 }
    );
  return Response.json({ posts: data }, { status: 200 });
}
