import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const button = tv({
  base: "btn",
  variants: {
    variant: {
      contained: "btn-primary text-white",
      outlined: "btn-outline btn-info",
      cancel: "btn-outline btn-error",
      isLoading: "btn-disabled",
      isDisabled: "btn-disabled",
      iconButton: "btn-square",
    },
  },
  defaultVariants: {
    variant: "contained",
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
    <button
      type="button"
      className={twMerge(button({ variant }), className)}
      {...props}
    >
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
