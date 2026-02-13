import type { ReactNode } from "react"
import clsx from "clsx"

interface FieldProps {
  label?: string
  required?: boolean
  description?: string
  error?: string
  disabled?: boolean
  children: ReactNode
  className?: string
}

export default function Field({
  label,
  required,
  description,
  error,
  disabled,
  children,
  className,
}: FieldProps) {
  return (
    <div className={clsx("field", disabled && "is-disabled", className)}>
      {label && (
        <label className="field-label">
          {label}
          {required && <span className="field-required">*</span>}
        </label>
      )}

      <div className="field-control">{children}</div>

      {description && !error && (
        <div className="field-description">{description}</div>
      )}

      {error && <div className="field-error">{error}</div>}
    </div>
  )
}
