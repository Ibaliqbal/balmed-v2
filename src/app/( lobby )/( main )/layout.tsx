import LeftSide from "@/layouts/left-side";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (!session) return redirect("/");
  return (
    <main className="grid grid-cols-9 container max-w-7xl gap-4">
      <LeftSide />
      <section className="col-span-7 grid grid-cols-5 gap-4">
        {children}
      </section>
    </main>
  );
};

export default layout;
