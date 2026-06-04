import { NavLink } from "react-router-dom";
import "./Navbar.css";

import logo from "../assets/Logo.png";
import avatar from "../assets/Avatar.png";
import notifications from "../assets/notifications.png";

type NavItem = {
  label: string;
  path: string;
  icon?: string;
  end?: boolean;
};

export default function Navbar({ pageNames }: { pageNames: NavItem[] }) {
  return (
    <aside className="sidebar">
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="dashboard logo" />
          <p>Student</p>
        </div>

        <div className="top-icons">
          <img className="avatar" src={avatar} alt="user icon" />

          <div className="notification-wrapper">
            <img src={notifications} alt="notifications icon" />
            <span className="badge">2</span>
          </div>
        </div>
      </div>

      <nav>
        <ul>
          {pageNames.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={`${item.label} icon`}
                    className="nav-icon"
                  />
                )}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}