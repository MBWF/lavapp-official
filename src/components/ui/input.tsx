import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  errorMessage?: string;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, errorMessage, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <Label htmlFor={id}>{label}</Label>}
        <input
          id={id}
          ref={ref}
          {...props}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        />
        {Boolean(errorMessage) && (
          <span className="text-sm text-destructive">{errorMessage}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
