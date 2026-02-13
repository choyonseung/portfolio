import { CircleCheck } from "lucide-react"

interface CheckboxProps {
  checked: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  size?: "sm" | "md" | "lg"
}

const iconSizeMap = {
  sm: 18,
  md: 20,
  lg: 24,
}

export default function Checkbox({
  checked,
  onChange,
  label,
  disabled,
  size = "md",
}: CheckboxProps) {
  const iconColor = disabled
  ? checked
    ? "var(--color-primary)"
    : "var(--color-text-muted)"
  : checked
  ? "var(--color-primary)"
  : "var(--color-border)";

  return (
    <label className={`checkbox checkbox-${size} ${disabled ? "-disabled" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className={`checkbox-box ${checked ? "-checked" : ""}`}>
        <CircleCheck size={iconSizeMap[size]} color={iconColor} />
      </span>
      {label && <span className="checkbox-label">{label}</span>}
    </label>

  )
}