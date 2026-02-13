import type { ReactNode } from "react"
import { useTabs } from "./Tabs"

interface TabPanelProps {
  value: string
  children: ReactNode
}

export default function TabPanel({ value, children }: TabPanelProps) {
  const { value: active } = useTabs()
  if (active !== value) return null
  return <div className="tab-panel">{children}</div>
}
