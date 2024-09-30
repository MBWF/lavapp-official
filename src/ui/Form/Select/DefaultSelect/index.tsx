import { forwardRef } from "react";
import Select from "react-select";

import { Label } from "@/components/ui/label";
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

const DefaultSelectStyled = ({
  defaultOptions,
  isMulti = false,
  placeholder,
  label,
  hasError,
  isDisabled,
  defaultValue,
  onChange,
  ...rest
}: SelectInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="select">{label}</Label>
      <Select
        data-testid="selectInput"
        aria-label={label}
        aria-labelledby={label}
        isMulti={isMulti}
        styles={selectStyles}
        isDisabled={isDisabled}
        options={defaultOptions}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        className="p-0 min-w-fit"
        {...rest}
      />
      {!!hasError && (
        <span className="text-xs text-destructive">{hasError}</span>
      )}
    </div>
  );
};

export const DefaultSelectInput = forwardRef(DefaultSelectStyled);
