import React from "react";
import "./teacher.css";
import Stats from "../../types/teacher/StatisticBoxTemplate.tsx";
import Sidebar from "../../common/SideBarTeacher.tsx";

export default function Dashboard() {
  return (
    <div className="container">
          <Sidebar />
      <main className="main">
        <div className="header">Welcome back, [[USER NAME]]</div>
        <h3>Overall Performance</h3>

         <Stats />

        <div className="charts">
          <div className="chart-box">
            {" "}
            <img src="src\assets\Student-Statistic.png" />{" "}
          </div>
          <div className="chart-box">
            <img src="src\assets\Class-Progress.png" />
          </div>
          <div className="chart-box large">
            <img src="src\assets\Attendance.png" />
          </div>
        </div>

        <div className="bottom">
          <MenuList title="Recent Assignments" items={recentAssignments} />
          <MenuList title="Submission View" items={submissionView} />
        </div>
      </main>
    </div>
  );
}
