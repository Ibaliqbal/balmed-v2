"use client";
import Image, { type ImageProps } from "next/image";
import React, { useState } from "react";

const CustomImage = ({
  alt,
  src,
  width,
  height,
  className,
  ...rest
}: ImageProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        unoptimized
        onLoadingComplete={() => setLoading(false)}
        {...rest}
        className={`${className} ${loading ? "animate-pulse bg-gray-700" : ""}`}
      />
    </figure>
  );
};

export default CustomImage;
