import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import "./teacherlayout.css"


import grid from "../assets/grid.png";
import create from "../assets/create.png";
import fileTrayFull from "../assets/file-tray-full.png";
import documents from "../assets/documents.png";
import vector from "../assets/Vector.png";
import help from "../assets/help.png";

const teacherNavItems = [
  { icon: grid, label: "Dashboard", path: "/teacher" },
  {
    icon: create,
    label: "Assignments",
    path: "/teacher/create-assignment",
  },
  {
    icon: fileTrayFull,
    label: "Resources",
    path: "/teacher/resources",
  },
  {
    icon: documents,
    label: "Submissions",
    path: "/teacher/submissions",
  },
  {
    icon: vector,
    label: "Settings",
    path: "/teacher/settings",
  },
  { icon: help, label: "Help", path: "/teacher/help" },
];


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
