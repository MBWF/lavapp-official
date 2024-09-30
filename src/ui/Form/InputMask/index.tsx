import { ComponentPropsWithoutRef } from "react";
import InputMask, { Props } from "react-input-mask";
import { ContainerInputMask } from "./styles";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type InputMaskProps = {
  label?: string;
  mask: string;
  className?: string;
} & ComponentPropsWithoutRef<"input"> &
  Props;

export function InputMaskCustom({ label, className, ...rest }: InputMaskProps) {
  return (
    <ContainerInputMask>
      {label && <Label htmlFor={label}>{label}</Label>}
      <InputMask
        id={label}
        aria-label={label}
        aria-labelledby={label}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...rest}
      />
    </ContainerInputMask>
  );
}
