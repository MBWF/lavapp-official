import { forwardRef } from "react";
import Select from "react-select";

import { selectStyles } from "../selectStyles";

type SelectInputProps = {
  defaultOptions:
    | {
        value: string;
        label: string;
      }[]
    | undefined;
  hasError?: string;
  isMulti?: boolean;
  label: string;
  placeholder: string;
  isDisabled?: boolean;
  defaultValue?: {
    value: string;
    label: string;
  }[];
  onChange?: (newValue: any) => void;
};

const DefaultSelectStyled = (
  {
    defaultOptions,
    isMulti = false,
    placeholder,
    label,
    hasError,
    isDisabled,
    defaultValue,
    onChange,
    ...rest
  }: SelectInputProps,
  ref: React.ForwardedRef<HTMLElement>
) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="select">{label}</label>
      <Select
        data-testid="selectInput"
        isMulti={isMulti}
        styles={selectStyles}
        isDisabled={isDisabled}
        options={defaultOptions}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        className="select p-0 w-max"
        {...rest}
      />
      {!!hasError && <span className="text-error">{hasError}</span>}
    </div>
  );
};

export const DefaultSelectInput = forwardRef(DefaultSelectStyled);
