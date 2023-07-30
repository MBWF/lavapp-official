import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type HeadingProps = ComponentProps<"h2"> & {
  children: ReactNode;
  className?: string;
};

export function Heading({ children, className, ...props }: HeadingProps) {
  return (
    <h2
      className={twMerge(
        "font-futura text-4xl text-secundary font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
