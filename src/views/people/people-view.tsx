import UserCard from "@/components/user/user-card";
import React from "react";

const PeopleView = () => {
  return (
    <section className="pt-4 flex flex-col gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <UserCard key={i} />
      ))}
    </section>
  );
};

export default PeopleView;
