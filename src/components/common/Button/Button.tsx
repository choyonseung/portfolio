import React from "react";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonColor =
  | "primary"
  | "neutral"
  | "accent"
  | "pink"
  | "info"
  | "success"
  | "warning"
  | "danger";
export type ButtonVariant = "solid" | "outline" | "ghost" | "icon" | "pill";

type IconElement =
  | React.ReactElement
  | ((props: { size: number; className?: string }) => React.ReactElement);

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  iconLeft?: IconElement;
  iconRight?: IconElement;
  ariaLabel?: string;
  loading?: boolean;
};

function getIconSize(size: ButtonSize) {
  switch (size) {
    case "xs":
      return 14;
    case "sm":
      return 16;
    case "md":
      return 18;
    case "lg":
      return 20;
    case "xl":
      return 22;
    default:
      return 18;
  }
}

type IconRenderable =
  | React.ReactElement<any>
  | ((props: { size: number; className?: string }) => React.ReactElement);

function renderIcon(icon: IconRenderable | undefined, size: number) {
  if (!icon) return null;

  // 함수형 아이콘 (lucide 권장 패턴)
  if (typeof icon === "function") {
    return icon({ size, className: "btn-icon" });
  }

  // JSX Element
  if (!React.isValidElement(icon)) return null;

  const nextProps: Record<string, any> = {
    className: ["btn-icon", (icon.props as any)?.className].filter(Boolean).join(" "),
  };

  // size를 지원하는 컴포넌트에만 size 주입
  if (icon.props && Object.prototype.hasOwnProperty.call(icon.props, "size")) {
    nextProps.size = (icon.props as any).size ?? size;
  }

  return React.cloneElement(icon, nextProps);
}

export default function Button({
  size = "md",
  color = "primary",
  variant = "solid",
  fullWidth = false,
  className = "",
  iconLeft,
  iconRight,
  ariaLabel,
  loading = false,
  children,
  disabled,
  ...props
}: Props) {
  const iconSize = getIconSize(size);

  const isIconOnly = !children && (iconLeft || iconRight);
  const resolvedVariant: ButtonVariant = isIconOnly ? "icon" : variant;

  const classes = [
    "btn",
    `btn-${size}`,
    `btn-color-${color}`,
    `btn-${resolvedVariant}`,
    fullWidth ? "btn-full" : "",
    loading ? "-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // a11y
  const finalAriaLabel = ariaLabel ?? (typeof children === "string" ? children : undefined);

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-label={isIconOnly ? finalAriaLabel : undefined}
      {...props}
    >
      {loading ? <span className="btn-spinner" aria-hidden /> : null}

      {iconLeft ? renderIcon(iconLeft, iconSize) : null}

      {children ? <span className="btn-text">{children}</span> : null}

      {iconRight ? renderIcon(iconRight, iconSize) : null}
    </button>
  );
}