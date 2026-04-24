import React from "react";

const navItems = [
  { icon: "/src/assets/grid.png", label: "Dashboard", alt: "dashboard" },
  { icon: "/src/assets/create.png", label: "Assignments", alt: "assignments" },
  { icon: "/src/assets/file-tray-full.png", label: "Resources", alt: "resources" },
  { icon: "/src/assets/documents.png", label: "Submissions", alt: "submissions" },
  { icon: "/src/assets/vector.png", label: "Settings", alt: "settings" },
  { icon: "/src/assets/help.png", label: "Help", alt: "help" },
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
          <img className="avatar" src="/src/assets/Avatar.png" alt="user icon" />

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
              <img src={item.icon} alt={item.alt} />
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}