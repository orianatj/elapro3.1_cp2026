import { useState } from "react";
import "./teacher.css";
import Stats from "../../types/teacher/StatisticBoxTemplate";
import MenuList from "./../../common/MenuList.tsx";
import type { MenuData } from "./../../common/MenuList.tsx";
import DashboardBandDistribution from "../../common/BandDistribution.tsx";
import { WeaknessTrends } from "../../common/WeaknessTrends.tsx";
import ProgressBar from "../../common/ProgressBar.tsx";
type TeacherRole = "supervisory_teacher" | "external_teacher";

type TeacherDashboardProps = {
  role?: TeacherRole;
  userName?: string;
};

export default function TeacherDashboard({
  role = "supervisory_teacher",
  userName = "Paul",
}: TeacherDashboardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isSupervisory = role === "supervisory_teacher";

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

  return (
    <div
      className={`dashboard-page ${isSupervisory ? "supervisory-layout" : "external-layout"
        }`}
    >
      <div className="header">
        Welcome back {userName}
      </div>

      <h3>Overall Performance</h3>

      <Stats />

      <div className="charts">
        <div className="chart-box">
          <><DashboardBandDistribution /></>
        </div>

        <div className="chart-box">
          <><ProgressBar /></>
        </div>

        <div className="chart-box">
          <><WeaknessTrends title="Weakness Trends" /></>
        </div>
      </div>

      {/* Existing section preserved */}
      {isSupervisory ? (
        <div className="bottom supervisory-bottom">
          <MenuList
            title="Created Assignments"
            items={recentAssignments}
          />

          <MenuList
            title="Submission View"
            items={submissionView}
          />
        </div>
      ) : (
        <div className="submission-center external-bottom">
          <MenuList
            title="Submission View"
            items={submissionView}
          />
        </div>
      )}

      {selectedImage && (
        <div
          className="image-modal"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Zoomed Chart"
            className="zoomed-image"
          />
        </div>
      )}
    </div>
  );
}