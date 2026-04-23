import React from "react";

interface AssignmentItemProps {
  day?: string;
  title: string;
  time?: string;
  status: string;
  isLate?: boolean;
  avatar?: string;
  isSubmission?: boolean;
}

export default function AssignmentItem({
  day,
  title,
  time,
  status,
  isLate,
  avatar,
  isSubmission = false,
}: AssignmentItemProps) {
  return (
    <li className="assignment-item">
      <div className={`assignment-date ${isSubmission ? "avatar-box" : ""}`}>
        {isSubmission ? (
          <img src={avatar} alt="student" />
        ) : (
          <span className="day">{day}</span>
        )}
      </div>

      <div className="assignment-title-wrap">
        <strong>{title}</strong>
      </div>

      <div className="assignment-meta">
        {time && <span className="time">{time}</span>}
        <span className={`status ${isLate ? "late" : ""}`}>
          {status}
        </span>
      </div>
    </li>
  );
}