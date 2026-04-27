import React from "react";
import "./teacher.css";
import Sidebar from "./../../common/SideBarTeacher.tsx";
import MenuList from "./../../common/MenuList.tsx";
import type { MenuData } from "./../../common/MenuList.tsx";

const recentAssignments: MenuData[] = [
  {
    id: "1",
    day: "23",
    title: "Learning Basics 2a",
    time: "12 P.M.",
    status: "Upcoming",
  },
  {
    id: "2",
    day: "24",
    title: "Biology Assessment 1b",
    time: "2 P.M.",
    status: "Upcoming",
  },
  {
    id: "3",
    day: "25",
    title: "Analysis Comp 2c",
    time: "4 P.M.",
    status: "Upcoming",
  },
];

const submissionView: MenuData[] = [
  {
    id: "4",
    title: "Steven Stone",
    status: "On Time",
    avatarSrc: "src/assets/ClipboardList.png",
    isAvatar: true,
  },
  {
    id: "5",
    title: "Joyle Jackie",
    status: "On Time",
    avatarSrc: "src/assets/ClipboardList.png",
    isAvatar: true,
  },
  {
    id: "6",
    title: "Kyle Cone",
    status: "LATE",
    avatarSrc: "src/assets/ClipboardList.png",
    isAvatar: true,
  },
];

export default function Dashboard() {
  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <div className="header">Welcome back, [[USER NAME]]</div>
        <h3>Overall Performance</h3>

        <div className="stats">
          <div className="card">
            <img src="src/assets/business.png" alt="submissions" />
            <span>My Courses</span>
            <strong>4</strong>
          </div>

          <div className="card">
            <img src="src/assets/people-circle.png" alt="students" />
            <span># Of Students</span>
            <strong>270</strong>
          </div>

          <div className="card">
            <img src="src/assets/newspaper.png" alt="reviews" />
            <span>Exams for Review</span>
            <strong>37</strong>
          </div>

          <div className="card">
            <img src="src/assets/podium.png" alt="performance" />
            <span>Avg. Performance</span>
            <strong>75.6%</strong>
          </div>

          <div className="card">
            <img src="src/assets/trending-up.png" alt="improvement" />
            <span>Improvement Rate</span>
            <strong>20%</strong>
          </div>
        </div>

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
