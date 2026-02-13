import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-title">Admin</div>

      <nav className="admin-sidebar-nav">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "is-active" : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "is-active" : ""}`
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/admin/projects"
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "is-active" : ""}`
          }
        >
          Projects
        </NavLink>
      </nav>
    </div>
  );
}
