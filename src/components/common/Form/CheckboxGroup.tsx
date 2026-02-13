import Checkbox from "./Checkbox"

interface Option {
  label: string
  value: string
  disabled?: boolean
}

interface CheckboxGroupProps {
  value: string[]
  options: Option[]
  onChange: (value: string[]) => void
  direction?: "row" | "column"
  size?: "sm" | "md" | "lg"
}

export default function CheckboxGroup({
  value,
  options,
  onChange,
  direction = "column",
  size = "md",
}: CheckboxGroupProps) {

  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter(v => v !== val))
    } else {
      onChange([...value, val])
    }
  }

  return (
    <div className={`checkbox-group checkbox-group-${direction}`}>
      {options.map((opt) => (
        <Checkbox
          key={opt.value}
          label={opt.label}
          checked={value.includes(opt.value)}
          disabled={opt.disabled}
          size={size}
          onChange={() => toggle(opt.value)}
        />
      ))}
    </div>
  )
}
