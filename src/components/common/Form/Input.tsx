import clsx from "clsx"
import type { InputHTMLAttributes } from "react"

export type InputSize = "sm" | "md" | "lg"

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize
  error?: boolean
  fullWidth?: boolean
}

export default function Input({
  size = "md",
  error = false,
  fullWidth = true,
  className,
  disabled,
  ...props
}: InputProps) {
  return (
    <input
      disabled={disabled}
      className={clsx(
        "input",
        `input-${size}`,
        error && "is-error",
        disabled && "is-disabled",
        fullWidth && "is-full",
        className
      )}
      {...props}
    />
  )
}