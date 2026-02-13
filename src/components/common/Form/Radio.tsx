import { Circle, CircleDot } from "lucide-react"

interface RadioProps {
  name: string
  checked: boolean
  onChange: () => void
  label?: string
  disabled?: boolean
  size?: "sm" | "md" | "lg"
}

const iconSizeMap = {
  sm: 18,
  md: 20,
  lg: 24,
}

export default function Radio({
  name,
  checked,
  onChange,
  label,
  disabled,
  size = "md",
}: RadioProps) {
  const iconColor = disabled
  ? checked
    ? "var(--color-primary)"
    : "var(--color-text-muted)"
  : checked
  ? "var(--color-primary)"
  : "var(--color-border)";

  return (
    <label className={`radio radio-${size} ${disabled ? "-disabled" : ""}`}>
      <input
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={`radio-box ${checked ? "-checked" : ""}`}>
        {checked ? (
          <CircleDot size={iconSizeMap[size]} color={iconColor} />
        ) : (
          <Circle size={iconSizeMap[size]} color={iconColor} />
        )}
      </span>
      {label && <span className="radio-label">{label}</span>}
    </label>
  )
}
