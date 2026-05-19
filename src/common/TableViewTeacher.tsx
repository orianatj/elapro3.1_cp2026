import React from "react";

export interface Submission {
  firstName: string;
  lastName: string;
  className: string;
  time: string;
  submittedAt: number;
  status: "On Time" | "Late" | "Extension";
}

interface SubmissionTableProps {
  submissions: Submission[];
}

export default function SubmissionTable({ submissions }: SubmissionTableProps) {
  const filteredAndSorted = submissions;

  return (
    <div className="table-container">
      <table className="submission-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Class</th>
            <th>Submission Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredAndSorted.map((s, index) => (
            <tr key={index}>
              <td>{s.firstName}</td>
              <td>{s.lastName}</td>
              <td>{s.className}</td>
              <td>{s.time}</td>
              <td>
                <span
                  className={`status-badge ${
                    s.status === "Late"
                      ? "late"
                      : s.status === "Extension"
                      ? "extension"
                      : "on-time"
                  }`}
                >
                  {s.status === "Extension"
                    ? "On Time (Extension Approved)"
                    : s.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}