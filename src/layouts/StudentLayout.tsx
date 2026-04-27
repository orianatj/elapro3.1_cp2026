import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";


const studentNavItems = [
    { label: "Dashboard", path: "/student" },
    { label: "Essay Submission", path: "/student/essay-submission" },
    { label: "Practice Writing", path: "/student/practice-writing" },
    { label: "Reports", path: "/student/reports" },

];


export default function StudentLayout() {
    return (
        <div>
            <Navbar pageNames={studentNavItems} />
            <header>Student Header</header>

            <main>
                <Outlet />
            </main>
        </div>
    )
};