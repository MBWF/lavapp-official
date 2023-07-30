import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const button = tv({
  base: "btn",
  variants: {
    variant: {
      primary: "btn-primary text-white",
      secundary: "btn-outline btn-info",
      isLoading: "btn-disabled",
      isDisabled: "btn-disabled",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    children: ReactNode;
    className?: string;
  };

export function Button({
  children,
  variant,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={twMerge(button({ variant }), className)} {...props}>
      {variant === "isLoading" ? (
        <>
          <span className="loading loading-spinner"></span>
          Carregando
        </>
      ) : (
        children
      )}
    </button>
  );
}
