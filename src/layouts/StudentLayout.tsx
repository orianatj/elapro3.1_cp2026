import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Sidebar from "../common/SideBarTeacher";
import { GreetingBanner } from "../studentDashboard/GreetingBanner";

const studentNavItems = [
    { label: "Dashboard", path: "/student" },
    { label: "Essay Submission", path: "/student/essay-submission" },
    { label: "Practice Writing", path: "/student/practice-writing" },
    { label: "Reports", path: "/student/reports" },

];


export default function StudentLayout() {
    return (
        <div className="container">
            {/*<Navbar pageNames={studentNavItems} />*/}
            {/*<Sidebar />*/}

            <div className="main">
                <div><GreetingBanner name={"Oriana"} /></div>

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
};