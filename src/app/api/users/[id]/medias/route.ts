import { supabase } from "@/libs/supabase/init";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from("postings")
    .select(`media`)
    .eq("creator_id", params.id)
    .order("upload_at", { ascending: false });

  if (error)
    return Response.json(
      { message: "Something went wrong in server", posts: [] },
      { status: 400, statusText: "Bad request" }
    );

  return Response.json(
    { medias: data.flatMap((data) => data.media) },
    { status: 200, statusText: "OK" }
  );
}
