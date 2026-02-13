import { useTabs } from "./Tabs"
import clsx from "clsx"

interface TabProps {
  label: string
  value: string
}

export default function Tab({ label, value }: TabProps) {
  const { value: active, onChange } = useTabs()
  const selected = active === value

  return (
    <button
      className={clsx("tab", selected && "tab-active")}
      onClick={() => onChange(value)}
      type="button"
    >
      {label}
      {selected && <span className="tab-indicator" />}
    </button>
  )
}
