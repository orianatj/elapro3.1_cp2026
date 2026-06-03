import { NavLink } from "react-router-dom";
import "../common/primarynavigation.css";

import logoIcon from "../assets/Logo.png";
import avatarIcon from "../assets/Avatar.png";
import notificationsIcon from "../assets/notifications.png";
import dashboardIcon from "../assets/grid.png";
import usersIcon from "../assets/Avatar.png";
import subscriptionsIcon from "../assets/documents.png";
import reportsIcon from "../assets/file-tray-full.png";

const adminNavItems = [
  {
    icon: dashboardIcon,
    label: "Dashboard",
    path: "/admin",
  },
  {
    icon: usersIcon,
    label: "Users",
    path: "/admin/users",
  },
  {
    icon: subscriptionsIcon,
    label: "Subscriptions",
    path: "/admin/subscriptions",
  },
  {
    icon: reportsIcon,
    label: "Reports",
    path: "/admin/reports",
  },
];

export default function SideBarAdmin() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-top-section">
        <div className="admin-logo">
          <img src={logoIcon} alt="ELA Pro logo" />
          <p>Admin</p>
        </div>

        <div className="admin-top-icons">
          <img
            className="admin-avatar"
            src={avatarIcon}
            alt="admin avatar"
          />

          <div className="admin-notification-wrapper">
            <img src={notificationsIcon} alt="notifications" />
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
                <img src={item.icon} alt={`${item.label} icon`} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}