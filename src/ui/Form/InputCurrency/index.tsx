import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
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
      error: "text-destructive ",
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
        <Label className="label" htmlFor={label}>
          <span className="label-text">{label}</span>
        </Label>
        <Controller
          name={name}
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <NumericFormat
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              )}
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
          <span className="text-xs text-destructive">{error.message}</span>
        )}
      </div>
    </>
  );
};
