import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../hooks/useAuth";

// Define NavBar props
type NavItem = {
    icon?: string;
    label: string;
    path: string;
};


// NavBar component 
export default function Navbar({ pageNames }: { pageNames: NavItem[] }) {
    const { user: authUser } = useAuth();
    const isStudent = authUser?.userRole === "student";
    const isAdmin = authUser?.userRole === "admin";
    const isTeacher = authUser?.userRole === "supervisory_teacher" || authUser?.userRole === "external_teacher";
    
    return (

        <aside className="sidebar">
            <div className="top-section">
                <div className="logo">
                    <img src="/src/assets/Logo.png" alt="dashboard logo" />
                    {isStudent && <p>Student</p>}
                    {isAdmin && <p>Admin</p>}
                    {isTeacher && <p>Teacher</p>}
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
                            {item.icon && <img src={item.icon} />}
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


