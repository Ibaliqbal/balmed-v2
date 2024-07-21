import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (session) return redirect("/home");
  return (
    <main className="container py-7 h-dvh">
      <section className="max-w-7xl h-full grid grid-cols-2 rounded-xl bg-slate-800/55">
        <section className="w-full h-full flex justify-center items-center py-7 ">
          {children}
        </section>
        <section className="w-full h-full relative rounded-xl">
          <Image
            src={"/example.jpg"}
            alt={"bg"}
            loading={"lazy"}
            fill
            className="w-full h-full object-cover object-center rounded-xl"
          />
        </section>
      </section>
    </main>
  );
};

export default layout;
