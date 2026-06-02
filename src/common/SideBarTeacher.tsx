import { NavLink } from "react-router-dom";

import grid from "../assets/grid.png";
import create from "../assets/create.png";
import fileTrayFull from "../assets/file-tray-full.png";
import documents from "../assets/documents.png";
import vector from "../assets/Vector.png";
import help from "../assets/help.png";
import logo from "../assets/Logo.png";
import avatar from "../assets/Avatar.png";
import notifications from "../assets/notifications.png";



const navItems = [
  { icon: grid, label: "Dashboard", path: "/teacher" },
  {
    icon: create,
    label: "Assignments",
    path: "/teacher/create-assignment",
  },
  {
    icon: fileTrayFull,
    label: "Resources",
    path: "/teacher/resources",
  },
  {
    icon: documents,
    label: "Submissions",
    path: "/teacher/submissions",
  },
  {
    icon: vector,
    label: "Settings",
    path: "/teacher/settings",
  },
  { icon: help, label: "Help", path: "/teacher/help" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="dashboard logo" />
          <p>Teacher</p>
        </div>

        <div className="top-icons">
          <img className="avatar" src={avatar} alt="user icon" />

          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `notification-wrapper ${isActive ? "active" : ""}`
            }
          >
            <img src={notifications} alt="notifications icon" />
            <span className="badge">0</span>
          </NavLink>
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
