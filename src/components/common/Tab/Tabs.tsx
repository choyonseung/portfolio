import { createContext, useContext } from "react"
import type { ReactNode } from "react";
import clsx from "clsx"

interface TabsContextType {
  value: string
  onChange: (val: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

interface TabsProps {
  value: string
  onChange: (val: string) => void
  children: ReactNode
  size?: "sm" | "md" | "lg"
}

export function Tabs({ value, onChange, children, size = "md" }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div className={clsx("tabs", `tabs-${size}`)}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error("Tab must be used inside Tabs")
  return ctx
}

export default Tabs;
