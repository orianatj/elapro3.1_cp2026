import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./teacher.css";

import Stats from "../../types/teacher/StatisticBoxTemplate";
import MenuList from "../../common/MenuList";
import type { MenuData } from "../../common/MenuList";

import DashboardBandDistribution from "../../common/BandDistribution";
import { WeaknessTrends } from "../../common/WeaknessTrends";
import ProgressBar from "../../common/ProgressBar";

import { useSubmissionsList } from "../../hooks/useSubmissionsList";

import clipboardList from "../../assets/ClipboardList.png";

type TeacherRole = "supervisory_teacher" | "external_teacher";

type TeacherDashboardProps = {
  role?: TeacherRole;
  userName?: string;
};

type Student = {
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress?: string;
};

type Submission = {
  submissionId: string;
  userId: string;
  ieltsType: string;
  taskType: string;
  customQuestionText: string | null;
  status: string;
  submittedAt?: string;
  student?: Student;
};

function getItems(data: any): Submission[] {
  const candidates = [
    data?.data?.data?.items,
    data?.data?.items,
    data?.items,
    data,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  return [];
}

export default function TeacherDashboard({
  role = "supervisory_teacher",
  userName = "Paul",
}: TeacherDashboardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const navigate = useNavigate();

  const isSupervisory = role === "supervisory_teacher";

  const { data } = useSubmissionsList({ limit: 3 });

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

  const submissionView: MenuData[] = useMemo(() => {
    return getItems(data)
      .slice(0, 3)
      .map((submission) => ({
        id: submission.submissionId,
        title: `${submission.student?.firstName ?? ""} ${
          submission.student?.lastName ?? ""
        }`.trim(),
        status: submission.status,
        day: submission.submittedAt
          ? new Date(submission.submittedAt).getDate().toString()
          : "",
        time: submission.submittedAt
          ? new Date(submission.submittedAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })
          : "",
        avatarSrc: clipboardList,
        isAvatar: true,

        onClick: () =>
          navigate(
            `/teacher/individual-submission/${submission.submissionId}/${encodeURIComponent(
              submission.student?.firstName ?? "",
            )}/${encodeURIComponent(submission.student?.lastName ?? "")}`,
          ),
      })) as MenuData[];
  }, [data, navigate]);

  return (
    <div
      className={`dashboard-page ${
        isSupervisory ? "supervisory-layout" : "external-layout"
      }`}
    >
      <div className="header">Welcome back {userName}</div>

      <h3>Overall Performance</h3>

      <Stats />

      <div className="charts">
        <div className="chart-box">
          <DashboardBandDistribution />
        </div>

        <div className="chart-box">
          <ProgressBar />
        </div>

        <div className="chart-box">
          <WeaknessTrends title="Weakness Trends" />
        </div>
      </div>

      {isSupervisory ? (
        <div className="submission-center external-bottom">
          <MenuList title="Submission View" items={submissionView} />
        </div>
      ) : (
        <div className="bottom supervisory-bottom">
          <MenuList title="Created Assignments" items={recentAssignments} />

          <MenuList title="Submission View" items={submissionView} />
        </div>
      )}

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
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