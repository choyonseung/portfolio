import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import AdminLayout from "@/components/layout/admin/AdminLayout";

import Home from "@/pages/Home";
import AdminHome from "@/pages/admin/AdminHome";
import AdminProfile from "@/pages/admin/AdminProfile";
import AdminProjects from "@/pages/admin/AdminProjects";
import StyleGuide from "@/pages/StyleGuide";

type Theme = "light" | "dark";
const THEME_KEY = "theme";

export default function App() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    const applied: Theme = saved === "light" || saved === "dark" ? saved : "dark";

    setTheme(applied);
    document.documentElement.setAttribute("data-theme", applied);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  };

  return (
    <Layout theme={theme} onToggleTheme={toggleTheme}>
      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/styleguide" element={<StyleGuide />} />

        {/* admin */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <AdminLayout>
              <AdminProfile />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <AdminLayout>
              <AdminProjects />
            </AdminLayout>
          }
        />
      </Routes>
    </Layout>
  );
}