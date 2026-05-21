import React, { useState } from "react";
import "./teacher.css";
import Stats from "../../types/teacher/StatisticBoxTemplate";
import MenuList from "../../common/MenuList.tsx";
import type { MenuData } from "../../common/MenuList.tsx";

const submissionView: MenuData[] = [
  {
    id: "1",
    title: "Steven Stone",
    status: "On Time",
    avatarSrc: "/src/assets/ClipboardList.png",
    isAvatar: true,
  },
  {
    id: "2",
    title: "Joyle Jackie",
    status: "On Time",
    avatarSrc: "/src/assets/ClipboardList.png",
    isAvatar: true,
  },
  {
    id: "3",
    title: "Kyle Cone",
    status: "LATE",
    avatarSrc: "/src/assets/ClipboardList.png",
    isAvatar: true,
  },
];

export default function InternalTeacherPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="dashboard-page">
      <div className="header">
        Internal Teacher Dashboard
      </div>

      <h3>Overall Performance</h3>
      <Stats />

      <div className="charts">
        <div className="chart-box">
          <img
            src="/src/assets/Student-Statistic.png"
            alt="Student Statistic"
            onClick={() =>
              setSelectedImage("/src/assets/Student-Statistic.png")
            }
          />
        </div>

        <div className="chart-box">
          <img
            src="/src/assets/Class-Progress.png"
            alt="Class Progress"
            onClick={() =>
              setSelectedImage("/src/assets/Class-Progress.png")
            }
          />
        </div>

        <div className="chart-box large">
          <img
            src="/src/assets/Attendance.png"
            alt="Attendance"
            onClick={() =>
              setSelectedImage("/src/assets/Attendance.png")
            }
          />
        </div>
      </div>

      {/* Centered Submission View */}
      <div className="submission-center">
        <MenuList
          title="Submission View"
          items={submissionView}
        />
      </div>

      {/* Zoom Modal */}
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