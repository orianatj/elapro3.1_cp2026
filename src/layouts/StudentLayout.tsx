import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import "./studentlayout.css"


const studentNavItems = [
    { label: "Dashboard", path: "/student" },
    { label: "Essay Submission", path: "/student/essay-submission" },
    { label: "Practice Writing", path: "/student/practice-writing" },
    { label: "Submissions", path: "/student/submissions" },
]




export default function StudentLayout() {
    return (
        <div className="student-container">
            {/* Navigation Menu */}
            <Navbar pageNames={studentNavItems} />

            <div className="student-layout-body">
                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>

    )
};
