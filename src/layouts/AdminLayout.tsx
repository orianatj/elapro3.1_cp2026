import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Sidebar from "../common/SideBarTeacher";
import { GreetingBanner } from "../studentDashboard/GreetingBanner";




export default function AdminLayout() {
    return (
        <div className="container">
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