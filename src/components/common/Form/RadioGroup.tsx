import Radio from "./Radio"

interface RadioOption {
  label: string
  value: string
  disabled?: boolean
}

interface RadioGroupProps {
  name: string 
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
  direction?: "row" | "column"
  size?: "sm" | "md" | "lg"
}

export default function RadioGroup({
  name,
  value,
  onChange,
  options,
  direction = "column",
  size = "md",
}: RadioGroupProps) {
  return (
    <div className={`radio-group radio-group-${direction}`}>
      {options.map(opt => (
        <Radio
          key={opt.value}
          name={name}
          label={opt.label}
          checked={value === opt.value}
          disabled={opt.disabled}
          size={size}
          onChange={() => {
            if (!opt.disabled) onChange(opt.value)
          }}
        />
      ))}
    </div>
  )
}
