import { ComponentProps, forwardRef } from "react";
import { tv, VariantProps } from "tailwind-variants";

const input = tv({
  base: "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ",
  variants: {
    color: {
      default: "input-bordered",
      error: "input-error border-red-500",
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

function StyledInput(
  { label, hasError, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label" htmlFor={label}>
        <span className="label-text">{label}</span>
      </label>
      <input
        className={input({ color: hasError ? "error" : "default" })}
        aria-label={label}
        type="text"
        ref={ref}
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

export const Input = forwardRef(StyledInput);
