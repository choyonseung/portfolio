import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  error?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

export default function Select({
  size = "md",
  fullWidth = true,
  error = false,
  options,
  placeholder,
  className,
  ...props
}: SelectProps) {
  return (
    <select
      className={clsx(
        "select",
        `select-${size}`,
        {
          "is-full": fullWidth,
          "is-error": error,
        },
        className
      )}
      {...props}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}