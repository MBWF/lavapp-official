import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const input = tv({
  base: "input input-bordered w-full max-w-xs",
  variants: {
    color: {
      default: "input-bordered",
      error: "input-error",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

type InputProps = ComponentProps<"input"> &
  VariantProps<typeof input> & {
    label: string;
    hasError?: string;
  };

export function Input({ label, hasError, ...props }: InputProps) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        className={input({ color: hasError ? "error" : "default" })}
        {...props}
      />
      {hasError && (
        <label className="label">
          <span className="label-text-alt text-error">{hasError}</span>
        </label>
      )}
    </div>
  );
}
