"use client";
import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
  return (
    <>
      <NextTopLoader
        color="#2563eb"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        easing="ease"
        speed={200}
        zIndex={71}
        shadow="0 0 10px #2563eb,0 0 5px #2563eb"
      />
    </>
  );
}
