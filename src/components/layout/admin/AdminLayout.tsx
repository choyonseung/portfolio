import React from "react";
import AdminSidebar from "./AdminSidebar";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="admin-layout">
      <aside className="admin-layout-sidebar">
        <AdminSidebar />
      </aside>

      <main className="admin-layout-content">{children}</main>
    </div>
  );
}
