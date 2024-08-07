import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "SignIn / BM",
  description: "What happened recently regarding entertainment or whatever",
  keywords: ["twitter clone", "balmed", "social media"],
  openGraph: {
    type: "website",
    title: "SignIn / BM",
    description: "What happened recently regarding entertainment or whatever",
    images: "/demo.png",
  },
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (session) return redirect("/home");
  return (
    <main className="container py-7 h-dvh">
      <section className="max-w-7xl h-full lg:grid lg:grid-cols-2 flex justify-center items-center rounded-xl bg-slate-800/55">
        <section className="w-full h-full flex justify-center items-center py-7 ">
          {children}
        </section>
        <section className="w-full h-full relative rounded-xl lg:block hidden">
          <Image
            src={"/example.jpg"}
            alt={"bg"}
            priority
            fill
            className="w-full h-full object-cover object-center rounded-xl"
          />
        </section>
      </section>
    </main>
  );
};

export default layout;
