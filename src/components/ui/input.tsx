import React, { ComponentPropsWithoutRef } from "react";

const Input = ({
  className,
  type,
  name,
  id,
  disabled,
  ...rest
}: ComponentPropsWithoutRef<"input">) => {
  return (
    <input
      className={`${className}`}
      id={id}
      type={type}
      name={name}
      disabled={disabled}
      {...rest}
    />
  );
};

export default Input;
