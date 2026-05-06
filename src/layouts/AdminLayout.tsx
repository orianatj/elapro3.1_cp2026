import { Outlet } from "react-router-dom";
import SideBarAdmin from "../common/SideBarAdmin";
import "../pages/admin/adminDashboard.css";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <SideBarAdmin />

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}