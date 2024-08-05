import LeftSide from "@/layouts/left-side";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (!session) return redirect("/");
  return (
    <main className="lg:grid lg:grid-cols-9 container lg:px-[1.25rem] max-w-7xl lg:gap-4">
      <LeftSide />
      <section className="lg:col-span-7 lg:grid lg:grid-cols-5 lg:gap-4">
        {children}
      </section>
    </main>
  );
};

export default layout;
