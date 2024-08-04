import { ComponentPropsWithoutRef } from "react";
import { LuLoader2 } from "react-icons/lu";

type Props = ComponentPropsWithoutRef<"div">;

const Loading = ({ className, ...rest }: Props) => {
  return (
    <div
      className={`w-full items-center justify-center flex pt-4 ${className}`}
      {...rest}
    >
      <LuLoader2 className="text-white w-5 h-5 animate-spin " />
    </div>
  );
};

export default Loading;
