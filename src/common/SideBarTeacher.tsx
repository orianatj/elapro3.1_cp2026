import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: "/src/assets/grid.png", label: "Dashboard", path: "/teacher" },
  {
    icon: "/src/assets/create.png",
    label: "Assignments",
    path: "/teacher/assignments",
  },
  {
    icon: "/src/assets/file-tray-full.png",
    label: "Resources",
    path: "/teacher/resources",
  },
  {
    icon: "/src/assets/documents.png",
    label: "Submissions",
    path: "/teacher/submissions",
  },
  { icon: "/src/assets/vector.png", label: "Settings", path: "/teacher/settings" },
  { icon: "/src/assets/help.png", label: "Help", path: "/teacher/help" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="top-section">
        <div className="logo">
          <img src="/src/assets/logo.png" alt="dashboard logo" />
          <p>Teacher</p>
        </div>

        <div className="top-icons">
          <img
            className="avatar"
            src="/src/assets/Avatar.png"
            alt="user icon"
          />

          <div className="notification-wrapper">
            <img src="/src/assets/notifications.png" alt="notifications icon" />
            <span className="badge">2</span>
          </div>
        </div>
      </div>

      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                end={item.label === "Dashboard"}
              >
                <img src={item.icon} alt={item.label} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}