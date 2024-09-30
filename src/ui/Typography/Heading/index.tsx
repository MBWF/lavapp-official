import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type HeadingProps = ComponentProps<"h2"> & {
  children: ReactNode;
  className?: string;
};



export function Heading({ children, className }: HeadingProps) {
  return (
    <h2
      className={twMerge(
        "font-robotoSlab text-4xl text-secundary font-semibold",
        className
      )}
    >
      {children}
    </h2>
  );
}
