import { Info } from "lucide-react";
import type { ReactNode } from "react";

export type TypographyLevel = "head" | "body" | "info";
export type TypographySize = "h1" | "h2" | "h3" | "h4" | "h5";

type Props = {
  label: string;
  labelHidden?: boolean;
  level?: TypographyLevel;
  size?: TypographySize;
  color?: string;
  className?: string;
  children?: ReactNode;
};

const iconSizeMap: Record<TypographySize, number> = {
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 18,
  h5: 16,
};

export default function Typography({
  label,
  labelHidden,
  level = "body",
  size = "h4",
  color,
  children,
}: Props) {
  const Tag = level === "head" ? size : "p";
  const textColor = color || "var(--color-text)";

  return (
    <div className="typography" style={{ color: textColor }}>
      <div className={`typography-${level}`}>
        {level === "info" && (
          <span className="mark">
            <Info
              size={iconSizeMap[size]}
              color={textColor}
              strokeWidth={2.2}
            />
          </span>
        )}

        <Tag className={`${size} ${labelHidden ? "blind" : ""}`}>
          {label}
        </Tag>
      </div>

      {children && <div className="typography-sub">{children}</div>}
    </div>
  );
}
