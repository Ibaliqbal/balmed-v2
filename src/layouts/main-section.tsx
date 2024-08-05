import NavbarBottom from "@/components/navbar/navbar-bottom";
import React, { ComponentPropsWithoutRef } from "react";

const MainSection = ({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"main"> & {
  children: React.ReactNode;
}) => {
  return (
    <main className={`lg:col-span-3 ${className}`} {...rest}>
      {children}
      <NavbarBottom />
    </main>
  );
};

export default MainSection;
