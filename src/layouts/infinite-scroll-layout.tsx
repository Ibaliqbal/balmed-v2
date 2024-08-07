"use client";
import { ComponentPropsWithoutRef } from "react";
import { useInView } from "react-intersection-observer";

const InfiniteScrollLayout = ({
  callback,
  children,
  ...rest
}: {
  callback: Function;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<"section">) => {
  const { ref } = useInView({
    rootMargin: "100px",
    onChange(inView, entry) {
      callback();
    },
  });
  return (
    <section {...rest}>
      {children}
      <div ref={ref} />
    </section>
  );
};

export default InfiniteScrollLayout;
