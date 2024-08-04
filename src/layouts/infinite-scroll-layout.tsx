"use client";
import { useInView } from "react-intersection-observer";

const InfiniteScrollLayout = ({
  callback,
  children,
}: {
  callback: Function;
  children: React.ReactNode;
}) => {
  const { ref } = useInView({
    rootMargin: "300px",
    onChange(inView, entry) {
      callback();
    },
  });
  return (
    <div>
      {children}
      <div ref={ref} />
    </div>
  );
};

export default InfiniteScrollLayout;
