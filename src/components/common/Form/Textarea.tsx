import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";

export type TextareaSize = "sm" | "md" | "lg";

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  uiSize?: TextareaSize;
  error?: boolean;
  fullWidth?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export default function Textarea({
  uiSize = "md",
  error = false,
  fullWidth = true,
  resize = "none",
  className,
  disabled,
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      disabled={disabled}
      className={clsx(
        "textarea",
        `textarea-${uiSize}`,
        `resize-${resize}`,
        error && "is-error",
        disabled && "is-disabled",
        fullWidth && "is-full",
        className
      )}
    />
  );
}