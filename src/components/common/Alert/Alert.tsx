import { useEffect } from "react"
import { X } from "lucide-react"
import Button from "@/components/common/Button/Button"

interface AlertButton {
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

interface AlertProps {
  open: boolean
  title: string
  description?: string
  onClose?: () => void
  primaryButton?: AlertButton
  secondaryButton?: AlertButton
}

export default function Alert({
  open,
  title,
  description,
  onClose,
  primaryButton,
  secondaryButton
}: AlertProps) {

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

      <div className="modal-content modal-sm modal-center">
        <div className="modal-header">
          <h3>{title}</h3>
          {onClose && (
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          )}
        </div>

        {description && (
          <div className="modal-body">
            <p>{description}</p>
          </div>
        )}

        {(primaryButton || secondaryButton) && (
          <div className="modal-footer">
            {secondaryButton && (
              <Button
                size="md"
                color={secondaryButton.color ?? "primary"}
                variant={secondaryButton.variant ?? "outline"}
                onClick={secondaryButton.onClick}
              >
                {secondaryButton.label}
              </Button>
            )}

            {primaryButton && (
              <Button
                size="md"
                color={primaryButton.color ?? "primary"}
                variant={primaryButton.variant ?? "solid"}
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