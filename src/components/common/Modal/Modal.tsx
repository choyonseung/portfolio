import { X } from "lucide-react"
import { useEffect } from "react"
import type { ReactNode } from "react"
import clsx from "clsx"
import Button from "@/components/common/Button/Button"

type ModalSize = "sm" | "md" | "lg"
type ModalVariant = "center" | "bottom"

interface ModalButton {
  label: string
  onClick: () => void
  color?:
    "primary"
  | "neutral"
  | "accent"
  | "pink"
  | "info"
  | "success"
  | "warning"
  | "danger";
  variant?: "solid" | "outline" | "ghost" | "icon" | "pill"
}

interface ModalProps {
  open: boolean
  title?: string
  children: ReactNode
  onClose: () => void
  size?: ModalSize
  variant?: ModalVariant
  primaryButton?: ModalButton
  secondaryButton?: ModalButton
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
  variant = "center",
  primaryButton,
  secondaryButton,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose} />

      <div
        className={clsx(
          "modal-content",
          `modal-${variant}`,
          variant === "center" && `modal-${size}`
        )}
      >
        {title && (
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        )}

        <div className="modal-body">{children}</div>

        {(primaryButton || secondaryButton) && (
          <div className="modal-footer">
            {secondaryButton && (
              <Button
                size="md"
                color={secondaryButton.color || "primary"}
                variant={secondaryButton.variant || "outline"}
                onClick={secondaryButton.onClick}
              >
                {secondaryButton.label}
              </Button>
            )}
            {primaryButton && (
              <Button
                size="md"
                color={primaryButton.color || "primary"}
                variant={primaryButton.variant || "solid"}
                onClick={primaryButton.onClick}
              >
                {primaryButton.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}