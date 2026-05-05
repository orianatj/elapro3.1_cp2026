import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import { GreetingBanner } from "../studentDashboard/GreetingBanner";
import "./studentlayout.css"


const studentNavItems = [
    { label: "Dashboard", path: "/student" },
    { label: "Essay Submission", path: "/student/essay-submission" },
    { label: "Practice Writing", path: "/student/practice-writing" },
    { label: "Reports", path: "/student/reports" },
]




export default function StudentLayout() {
    return (
        <div className="student-container">
            {/* Navigation Menu */}
            <Navbar pageNames={studentNavItems} />

            <div className="student-layout-body">
                <header className="greeting-banner"><GreetingBanner name={"Oriana"} />
                </header>
                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>

    )
};
