
import { NavLink } from "react-router-dom";
import "../common/primarynavigation.css";

const adminNavItems = [
  {
    icon: "/src/assets/grid.png",
    label: "Dashboard",
    path: "/admin",
  },
  {
    icon: "/src/assets/Avatar.png",
    label: "Users",
    path: "/admin/users",
  },
  {
    icon: "/src/assets/documents.png",
    label: "Subscriptions",
    path: "/admin/subscriptions",
  },
  {
    icon: "/src/assets/file-tray-full.png",
    label: "Reports",
    path: "/admin/reports",
  },
  /*{
    icon: "/src/assets/vector.png",
    label: "Settings",
    path: "/admin/settings",
  },*/
];

export default function SideBarAdmin() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-top-section">
        <div className="admin-logo">
          <img src="/src/assets/logo.png" alt="ELA Pro logo" />
          <p>Admin</p>
        </div>

        <div className="admin-top-icons">
          <img
            className="admin-avatar"
            src="/src/assets/Avatar.png"
            alt="admin avatar"
          />

          <div className="admin-notification-wrapper">
            <img src="/src/assets/notifications.png" alt="notifications" />
            <span className="admin-badge">2</span>
          </div>
        </div>
      </div>

      <nav className="admin-nav">
        <ul>
          {adminNavItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  isActive ? "admin-nav-link active" : "admin-nav-link"
                }
              >
                <img src={item.icon} alt="" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}