import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import "./teacherlayout.css"
import dashboard from "../assets/studentnavicons/dashboard.png";
import submissions from "../assets/documents-black.png";

const teacherNavItems = [
  {icon: dashboard, label: "Dashboard", end: true, path: "/teacher" },
  {icon: submissions, label: "Submissions", path: "/teacher/submissions"},
]

export default function TeacherLayout() {
    return (
        <div className="student-container">
            {/* Navigation Menu */}
            <Navbar pageNames={teacherNavItems} />

            <div className="student-layout-body">
                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>

    )
};