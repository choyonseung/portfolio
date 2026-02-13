import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

type Theme = "light" | "dark";

type Props = {
  theme: Theme;
  onToggleTheme: () => void;
  children: React.ReactNode;
};

export default function Layout({ theme, onToggleTheme, children }: Props) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
