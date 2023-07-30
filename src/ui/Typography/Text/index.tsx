import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function Text({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={twMerge("font-robotoSlab text-xl text-secundary", className)}
      {...props}
    >
      {children}
    </span>
  );
}
