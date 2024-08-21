import PostLikeView from "@/views/post/post-like-view";
import React from "react";

type Props = {
  params: { id: string };
};

const page = async ({ params }: Props) => {
  return <PostLikeView id={params.id} />;
};

export default page;
