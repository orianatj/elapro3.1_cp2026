import { Outlet } from "react-router-dom";
import Sidebar from "../common/SideBarTeacher";
import { GreetingBanner } from "../studentDashboard/GreetingBanner";

export default function TeacherLayout() {
  return (
    <div className="teacher-container">
      <Sidebar />

      <div className="main">

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}