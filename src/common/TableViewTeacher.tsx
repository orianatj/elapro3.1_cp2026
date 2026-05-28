import React from "react";
import { useSubmissionsList } from "../hooks/useSubmissionsList";

type Submission = {
  submissionId: string;
  userId: string;
  ieltsType: string;
  taskType: string;
  customQuestionText: string | null;
  status: string;
};

export default function SubmissionTable() {
  const { data, isLoading, isError } = useSubmissionsList();

  const submissions: Submission[] = data?.data?.items ?? [];

  console.log("SUBMISSIONS:", submissions);

  if (isLoading) return <p>Loading submissions...</p>;
  if (isError) return <p>Failed to load submissions.</p>;

  return (
    <div className="table-container">
      <table className="submission-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>IELTS Type</th>
            <th>Task Type</th>
            <th>Submission Type</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map((s) => (
            <tr key={s.submissionId}>
              <td>{s.userId}</td>
              <td>{s.ieltsType}</td>
              <td>{s.taskType}</td>
              <td>
                {s.customQuestionText ? "Custom" : "Standard"}
              </td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}