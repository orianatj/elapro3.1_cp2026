import { NavLink } from "react-router-dom";
import "./Navbar.css";

// Define NavBar props
type NavItem = {
    label: string;
    path: string;
};


// NavBar component 
export default function Navbar({ pageNames }: { pageNames: NavItem[] }) {
    return (

        <aside className="sidebar">
            <div className="top-section">
                <div className="logo">
                    <img src="/src/assets/logo.png" alt="dashboard logo" />
                    <p>Student</p>
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
                    {pageNames.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};


