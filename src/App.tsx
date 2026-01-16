import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AdminHome from "./pages/admin/AdminHome";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminProjects from "./pages/admin/AdminProjects";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <Link to="/">🏠 Home</Link>
        <Link to="/admin">🔧 Admin</Link>
      </nav>

      <Routes>
        {/* 공개 페이지 */}
        <Route path="/" element={<Home />} />

        {/* 관리자 페이지 */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
      </Routes>
    </div>
  );
}
