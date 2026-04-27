import { NavLink } from "react-router-dom";

// Define NavBar props
type NavItem = {
    label: string;
    path: string;
};


// NavBar component 
export default function Navbar({ pageNames }: { pageNames: NavItem[] }) {
    return (
        <nav>
            {pageNames.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
};


