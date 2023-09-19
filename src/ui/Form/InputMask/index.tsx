import { ComponentPropsWithoutRef } from "react";
import InputMask, { Props } from "react-input-mask";
import { ContainerInputMask } from "./styles";

type InputMaskProps = {
  label?: string;
  hasError?: boolean;
  mask: string;
} & ComponentPropsWithoutRef<"input"> &
  Props;

export function InputMaskCustom({
  label,
  hasError = false,
  ...rest
}: InputMaskProps) {
  return (
    <ContainerInputMask hasError={!!hasError}>
      {label && <label htmlFor={label}>{label}</label>}
      <InputMask
        id={label}
        aria-label={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...rest}
      />
    </ContainerInputMask>
  );
}
