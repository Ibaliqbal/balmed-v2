import FormPost from "@/components/form/form-post";
import Image from "next/image";
import React from "react";

const HomeFormPost = ({ queryKey }: { queryKey: string[] }) => {
  return (
    <section className="mb-4 pt-4 border-b-2 border-slate-700 pb-4">
      <h1 className="text-2xl font-bold mb-3">Post something do you want</h1>
      <div className="flex gap-6 mt-8">
        <Image
          src={"/avatar.jpg"}
          alt={"Avatar"}
          width={70}
          height={70}
          loading={"eager"}
          className="rounded-full w-[50px] h-[50px] object-cover object-center"
        />
        <FormPost queryKey={queryKey} />
      </div>
    </section>
  );
};

export default HomeFormPost;
