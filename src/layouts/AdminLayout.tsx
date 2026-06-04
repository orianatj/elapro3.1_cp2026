import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import "../pages/admin/adminDashboard.css";

import dashboard from "../assets/grid.png";
import users from "../assets/primarynavigation/useravatar.png";
import subscriptions from "../assets/documents-black.png";
import reports from "../assets/file-tray-full.png";

const adminNavItems = [
  { label: "Dashboard", path: "/admin", end: true, icon: dashboard },
  { label: "Users", path: "/admin/users", icon: users },
  { label: "Subscriptions", path: "/admin/subscriptions", icon: subscriptions },
  { label: "Reports", path: "/admin/reports", icon: reports },
];

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <Navbar pageNames={adminNavItems} />

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}