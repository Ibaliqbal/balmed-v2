import HeaderWithBack from "@/components/header/header-with-back";
import RightPeople from "@/layouts/people/right-people";
import RightSide from "@/layouts/right-side";
import PeopleView from "@/views/people/people-view";

const page = () => {
  return (
    <>
      <main className="col-span-3">
        <HeaderWithBack>
          <h1 className="text-2xl font-semibold">People</h1>
        </HeaderWithBack>
        <section className="px-3 border-x-2 border-slate-700">
          <PeopleView />
        </section>
      </main>
      <RightSide>
        <RightPeople />
      </RightSide>
    </>
  );
};

export default page;
