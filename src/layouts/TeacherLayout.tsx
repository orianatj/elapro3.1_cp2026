import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import "./teacherlayout.css"
import grid from "../assets/grid.png";
import create from "../assets/create.png";
import documents from "../assets/documents.png";

const teacherNavItems = [
  {icon: grid, label: "Dashboard", end: true, path: "/teacher" },
  {icon: create, label: "Assignments", path: "/teacher/create-assignment"},
  {icon: documents, label: "Submissions", path: "/teacher/submissions"},
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