import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Text } from "../Text";

export function ErrorMessage({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Text className={twMerge("text-error text-sm", className)} {...props}>
      {children}
    </Text>
  );
}
