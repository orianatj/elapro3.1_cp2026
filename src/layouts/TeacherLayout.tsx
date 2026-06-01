import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import "./teacherlayout.css"


const teacherNavItems = [
    { label: "Dashboard", path: "/teacher" },
    { label: "Assignments", path: "/teacher/create-assignment" },
    { label: "Submissions", path: "/teacher/submissions" },
]




export default function TeacherLayout() {
    return (
        <div className="teacher-container">
            {/* Navigation Menu */}
            <Navbar pageNames={teacherNavItems} />

            <div className="teacher-layout-body">
                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>

    )
};
