import { useMemo } from "react";
import { useSubmissionsList } from "../hooks/useSubmissionsList";

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

type SortBy = "date" | "name" | "";

type Props = {
  sortBy?: SortBy;
  ieltsType?: string;
  taskType?: string;
  status?: string;
  currentPage?: number;
  itemsPerPage?: number;
};

function capitalizeWords(text: string) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

function getStatusClass(status: string) {
  const normalized = status.toLowerCase();

  if (normalized.includes("pending")) {
    return "status-badge status-pending";
  }

  if (normalized.includes("late")) {
    return "status-badge status-late";
  }

  return "status-badge status-default";
}

function normalize(value?: string) {
  return (value ?? "").trim().toLowerCase();
}

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

export default function TableView({
  sortBy = "",
  ieltsType = "",
  taskType = "",
  status = "",
  currentPage = 1,
  itemsPerPage = 25,
}: Props) {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useSubmissionsList({ limit: 100 });

  const submissions = useMemo(() => getItems(data), [data]);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      const matchesIelts =
        !ieltsType || normalize(s.ieltsType) === normalize(ieltsType);

      const matchesTask =
        !taskType || normalize(s.taskType) === normalize(taskType);

      const matchesStatus =
        !status || normalize(s.status) === normalize(status);

      return matchesIelts && matchesTask && matchesStatus;
    });
  }, [submissions, ieltsType, taskType, status]);

  const sortedSubmissions = useMemo(() => {
    return [...filteredSubmissions].sort((a, b) => {
      if (sortBy === "date") {
        const timeA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
        const timeB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
        return timeB - timeA;
      }

      if (sortBy === "name") {
        const nameA =
          `${a.student?.firstName ?? ""} ${a.student?.lastName ?? ""}`.trim();

        const nameB =
          `${b.student?.firstName ?? ""} ${b.student?.lastName ?? ""}`.trim();

        return nameA.localeCompare(nameB);
      }

      return 0;
    });
  }, [filteredSubmissions, sortBy]);

  const visibleSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortedSubmissions.slice(startIndex, endIndex);
  }, [sortedSubmissions, currentPage, itemsPerPage]);

  if (isLoading) return <p>Loading submissions...</p>;

  if (isError) return <p>Failed to load submissions.</p>;

  return (
    <div className="table-container">
      <table className="submission-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>IELTS Type</th>
            <th>Task Type</th>
            <th>Status</th>
            <th>Submitted At</th>
          </tr>
        </thead>

        <tbody>
          {visibleSubmissions.length === 0 ? (
            <tr>
              <td colSpan={6}>No submissions found.</td>
            </tr>
          ) : (
            visibleSubmissions.map((s) => (
              <tr
                key={s.submissionId}
                onClick={() => navigate(`/teacher/individual-submission/${s.submissionId}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{s.student?.firstName ?? "-"}</td>

                <td>{s.student?.lastName ?? "-"}</td>

                <td>{capitalizeWords(s.ieltsType)}</td>

                <td>{capitalizeWords(s.taskType)}</td>

                <td>
                  <span className={getStatusClass(s.status)}>
                    {capitalizeWords(s.status)}
                  </span>
                </td>

                <td>
                  {s.submittedAt
                    ? new Date(s.submittedAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}