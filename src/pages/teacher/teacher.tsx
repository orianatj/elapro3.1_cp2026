import React from "react";
import "./teacher.css";
import Stats from "../../types/teacher/StatisticBoxTemplate";
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
    avatarSrc: "/src/assets/ClipboardList.png",
    isAvatar: true,
  },
  {
    id: "5",
    title: "Joyle Jackie",
    status: "On Time",
    avatarSrc: "/src/assets/ClipboardList.png",
    isAvatar: true,
  },
  {
    id: "6",
    title: "Kyle Cone",
    status: "LATE",
    avatarSrc: "/src/assets/ClipboardList.png",
    isAvatar: true,
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
    <div className="header">Welcome back, [[USER NAME]]</div>


      <h3>Overall Performance</h3>
      <Stats />

      <div className="charts">
        <div className="chart-box">
          <img src="/src/assets/Student-Statistic.png" alt="Student Statistic" />
        </div>

        <div className="chart-box">
          <img src="/src/assets/Class-Progress.png" alt="Class Progress" />
        </div>

        <div className="chart-box large">
          <img src="/src/assets/Attendance.png" alt="Attendance" />
        </div>
      </div>

      <div className="bottom">
        <MenuList title="Recent Assignments" items={recentAssignments} />
        <MenuList title="Submission View" items={submissionView} />
      </div>
    </div>
  );
}