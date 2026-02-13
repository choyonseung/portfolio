import clsx from "clsx"
import type { ReactNode } from "react"

interface InputGroupProps {
  children: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  className?: string
}

export default function InputGroup({
  children,
  prefix,
  suffix,
  size = "md",
  fullWidth = true,
  className,
}: InputGroupProps) {
  return (
    <div
      className={clsx(
        "input-group",
        `input-group-${size}`,
        prefix && "has-prefix",
        suffix && "has-suffix",
        fullWidth && "is-full",
        className
      )}
    >
      {prefix && <div className="input-group-prefix">{prefix}</div>}
      <div className="input-group-control">{children}</div>
      {suffix && <div className="input-group-suffix">{suffix}</div>}
    </div>
  )
}