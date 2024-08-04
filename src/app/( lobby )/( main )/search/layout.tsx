import RightHome from "@/layouts/home/right-home";
import RightSide from "@/layouts/right-side";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="col-span-3">{children}</main>
      <RightSide>
        <RightHome />
      </RightSide>
    </>
  );
};

export default layout;
