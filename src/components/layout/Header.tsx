import { NavLink, useLocation } from "react-router-dom";
import Button from "@/components/common/Button/Button";

type Theme = "light" | "dark";

type Props = {
  theme: Theme;
  onToggleTheme: () => void;
};

export default function Header({ theme, onToggleTheme }: Props) {
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  // Home에서는 헤더를 최소화, Admin/System에서는 툴바 형태로 풍부하게
  const mode: "home" | "workbench" = isHome ? "home" : "workbench";

  return (
    <header className={`header header--${mode}`}>
      <div className="header__left">
        <div className="header__brand">Portfolio</div>

        {/* Home에서는 메뉴 숨김 */}
        {mode === "workbench" && (
          <nav className="header__nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `header-link ${isActive ? "is-active" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `header-link ${isActive ? "is-active" : ""}`
              }
            >
              Admin
            </NavLink>

            <NavLink
              to="/styleguide"
              className={({ isActive }) =>
                `header-link ${isActive ? "is-active" : ""}`
              }
            >
              Style Guide
            </NavLink>
          </nav>
        )}
      </div>

      <div className="header__right">
        {/* workbench에서만 theme 텍스트 노출 */}
        {mode === "workbench" && (
          <span className="header-meta">Theme: {theme}</span>
        )}

        <Button size="sm" color="primary" variant="outline" onClick={onToggleTheme}>
          {theme === "dark" ? "Dark" : "Light"}
        </Button>
      </div>
    </header>
  );
}