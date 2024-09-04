import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

// Define the Input component using forwardRef
const Input = forwardRef((props, ref) => {
  const { className, type, ...restProps } = props;

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md  px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...restProps}
    />
  );
});

// Set displayName for debugging purposes
Input.displayName = "Input";

export { Input };
