export type BadgeColor = "primary" | "accent" | "pink" | "info" | "success" | "warning";
export type BadgeVariant = "solid" | "outline";

type Props = {
  label: string;
  color?: BadgeColor;
  variant?: BadgeVariant;
  className?: string;
};

export default function Badge({
  label,
  color = "primary",
  variant = "solid",
  className = "",
}: Props) {
  return (
    <span className={`badge badge-${variant} badge-${color} ${className}`.trim()}>
      {label}
    </span>
  );
}
