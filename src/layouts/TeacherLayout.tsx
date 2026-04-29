import { Outlet } from "react-router-dom";
import Sidebar from "../common/SideBarTeacher";
import { GreetingBanner } from "../studentDashboard/GreetingBanner";

export default function TeacherLayout() {
  return (
    <div className="container">
      <Sidebar />

      <div className="main">
        <div>
          <GreetingBanner name={"USER NAME"} />
        </div>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}