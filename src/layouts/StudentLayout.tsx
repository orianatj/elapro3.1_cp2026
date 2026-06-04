import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import "./studentlayout.css"
import dashboard from "../assets/studentnavicons/dashboard.png";
import essaysubmission from "../assets/studentnavicons/essaysubmission.png";
import practicewriting from "../assets/studentnavicons/practicewriting.png";
import submissions from "../assets/studentnavicons/submissions.png";

const studentNavItems = [
    { label: "Dashboard", path: "/student", end: true, icon: dashboard },
    { label: "Essay Submission", path: "/student/essay-submission", icon: essaysubmission },
    { label: "Practice Writing", path: "/student/practice-writing", icon: practicewriting },
    { label: "Submissions", path: "/student/submissions", icon: submissions }
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
