import React from "react";

const BaseHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="w-full md:sticky md:top-0 z-10 bg-black/55 backdrop-blur-md">
      {children}
    </header>
  );
};

export default BaseHeader;
