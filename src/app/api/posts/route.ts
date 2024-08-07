import { supabase } from "@/libs/supabase/init";
import { queryPosting } from "@/utils/helpers";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { data, error } = await supabase
    .from("postings")
    .select(queryPosting)
    .is("comment_id", null)
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
