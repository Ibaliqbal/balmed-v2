import FormPost from "@/components/form/form-post";
import CustomImage from "@/components/ui/image";
import { getUserLogin } from "@/libs/supabase/function";
import { getServerSession } from "next-auth";
import Image from "next/image";

const DetailPostFormComment = async ({
  id,
  username,
}: {
  id: string;
  username: string;
}) => {
  const session = await getServerSession();
  const { data } = await getUserLogin(session?.user.email as string);
  return (
    <section className="mb-4 pt-4 border-b-2 border-slate-700 pb-4 px-4">
      <h1 className="text-2xl font-bold mb-3">Post something do you want</h1>
      <div className="md:flex gap-6 mt-8">
        <CustomImage
          src={
            data.photo
              ? data.photo.url
              : `https://ui-avatars.com/api/?name=${data.username}&background=random&color=fff`
          }
          alt={"Avatar"}
          width={70}
          height={70}
          className="rounded-full w-[50px] h-[50px] object-cover object-center hidden md:block"
        />
        <FormPost
          queryKey={["post", `${id}-comments`]}
          id={id}
          isComment
          username={username}
        />
      </div>
    </section>
  );
};

export default DetailPostFormComment;
