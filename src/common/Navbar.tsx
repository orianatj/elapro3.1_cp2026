import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logo.png";
import "../common/primarynavigation.css";
import { USER_ROLE_LABELS } from "../constants/userRoleLabels";
import useravatar from "../assets/primarynavigation/useravatar.png";
import notificationsbell from "../assets/primarynavigation/notificationsbell.png";
import type { NavItem } from "../types/common/NavBar";
import { useNotifications } from "../hooks/useNotifications";
import type { NotificationItem } from "../pages/common/notifications";


export type NavbarProps = {
    pageNames: NavItem[]
};

// NavBar component 
export default function Navbar({ pageNames }: { pageNames: NavItem[] }) {

    const menuRef = useRef<HTMLDivElement>(null);

    // Get logged-in user's info
    const { user, logout } = useAuth();

    // Return TSQ notifications query 
    const { data } = useNotifications(1);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    }

    if (!user) {
        return null;
    }
    // Determine if there are unread notifications  
    const hasUnreadNotifications = data?.data?.items?.some((notification: NotificationItem) => !notification.read) ?? false;


    // Get user role: student/teacher/administrator 
    const userLabel = USER_ROLE_LABELS[user.userRole];


    /* Register global click listener to detect clicks outside the avatar/menu container.
    Closes the user menu when the user interacts elsewhere on the page. */
    useEffect(() => {


        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) { setIsMenuOpen(false) }

        }
        // Check if the click occured outside the menu container 
        document.addEventListener("mousedown", handleClickOutside);

        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, []);

    return (

        <aside className="navbar-container">
            <div className="navbar-top-container">
                <div className="logo-container">
                    <img src={Logo} alt="ELA Pro logo" />
                    <p className="navbar-userlabel">{userLabel}</p>
                </div>

                <div className="icons-bar">
                    <div className="avatar-container" ref={menuRef}>
                        <button className="avatar-button" onClick={() => setIsMenuOpen(prev => !prev)}>
                            <img className="user-avatar" src={useravatar} alt={`${user.firstName} avatar`}></img>
                        </button>

                        {/* Conditionally render user menu */}

                        {isMenuOpen && (
                            <UserMenu name={user.firstName} onLogout={handleLogout} />)
                        }

                    </div>

                    {userLabel === "Student" && (
                        <div className="notification-container">
                            <NavLink to="notifications">
                                <img className="navbar-notification-icon" src={notificationsbell} alt="notifications-icon" />
                            </NavLink>

                            {hasUnreadNotifications &&
                                <span className="notification-indicator" />
                            }

                        </div>
                    )}


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
                                        alt=""
                                        className="nav-icon"
                                    />
                                )}
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

        </aside>
    );
};


// Define props for User Menu component 
export type UserMenuProps = {
    name: string;
    onLogout: () => void;
};

// User Menu Component 
export function UserMenu({ name, onLogout }: UserMenuProps) {

    return (
        <div className="user-menu-container">
            <div className="user-avatar-container">
                <img className="user-avatar-menu" src={useravatar} alt={`${name} avatar`}></img>
                <p className="avatar-name">{name}</p>
            </div>
            <ul className="menu-options">
                <li><NavLink to="/account-settings">Account Settings</NavLink></li>
                <li><button type="button" onClick={onLogout}>Logout</button></li>
            </ul>
        </div>

    );


};