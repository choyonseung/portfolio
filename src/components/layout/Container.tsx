import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: Props) {
  return <main className={`container ${className}`}>{children}</main>;
}