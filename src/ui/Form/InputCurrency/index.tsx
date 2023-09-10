import { ComponentProps } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { VariantProps, tv } from "tailwind-variants";

const input = tv({
  base: "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ",
  variants: {
    color: {
      default: "input-bordered",
      error: "input-error border-gray-300",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

type CurrencyInputProps = ComponentProps<"input"> &
  VariantProps<typeof input> & {
    label: string;
    name: string;
    error?: Merge<FieldError, FieldErrorsImpl<{}>> | null;
    control: Control<any, any> | undefined;
    placeholder?: string;
    defaultValue?: number | string;
  };

export const CurrencyInput = ({
  name,
  error = null,
  control,
  label,
  placeholder,
  defaultValue,
}: CurrencyInputProps) => {
  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor={label}>
          <span className="label-text">{label}</span>
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <NumericFormat
              className={input({ color: error ? "error" : "default" })}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              getInputRef={ref}
              placeholder={placeholder}
              defaultValue={defaultValue}
              fixedDecimalScale
              {...rest}
            />
          )}
        />
        {!!error && (
          <label className="label">
            <span className="label-text-alt text-error">{error.message}</span>
          </label>
        )}
      </div>
    </>
  );
};
