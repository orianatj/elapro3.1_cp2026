import { useMemo, useState } from "react";
import ToolbarButton from "../../common/ToolbarButton";
import TableView from "../../common/TableViewTeacher";
import "./teacher.css";
import "./teachersubmission.css";
import Pagination from "../../common/PageChanger";
import { useSubmissionsList } from "../../hooks/useSubmissionsList";

function getItems(data: any) {
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

function normalize(value?: string) {
  return (value ?? "").trim().toLowerCase();
}

export default function SubmissionsOverview() {
  const [sortBy, setSortBy] = useState<"date" | "name" | "">("");

  const [showFilters, setShowFilters] = useState(false);

  const [ieltsType, setIeltsType] = useState("");
  const [taskType, setTaskType] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 25;

  const { data } = useSubmissionsList({ limit: 100 });

  const submissions = useMemo(() => getItems(data), [data]);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s: any) => {
      const matchesIelts =
        !ieltsType || normalize(s.ieltsType) === normalize(ieltsType);

      const matchesTask =
        !taskType || normalize(s.taskType) === normalize(taskType);

      const matchesStatus =
        !status || normalize(s.status) === normalize(status);

      return matchesIelts && matchesTask && matchesStatus;
    });
  }, [submissions, ieltsType, taskType, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubmissions.length / itemsPerPage)
  );

  return (
    <div className="container">
      <main className="main">
        <div className="header">Submissions Overview</div>

        <div className="toolbar">
          <div className="search-box">
            <img
              src="/src/assets/search.png"
              alt="search"
              className="search-icon"
            />

            <input
              type="text"
              placeholder="Search by Student"
              className="search-input"
            />
          </div>

          <div className="toolbar-right">
            <select
              className="sort-dropdown"
              aria-label="sort by"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as "date" | "name" | "");
                setCurrentPage(1);
              }}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
            </select>

            <ToolbarButton
              icon="/src/assets/funnel.png"
              label="Filter"
              onClick={() => setShowFilters((prev) => !prev)}
            />

            <ToolbarButton
              icon="/src/assets/download.png"
              label="Export"
              onClick={() => console.log("Export clicked")}
            />
          </div>
        </div>

        {showFilters && (
          <div className="filter-panel">
            <select
              className="sort-dropdown"
              value={ieltsType}
              onChange={(e) => {
                setIeltsType(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All IELTS Types</option>
              <option value="academic">Academic</option>
              <option value="general">General</option>
            </select>

            <select
              className="sort-dropdown"
              value={taskType}
              onChange={(e) => {
                setTaskType(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Task Types</option>
              <option value="Task1">Task 1</option>
              <option value="Task2">Task 2</option>
            </select>

            <select
              className="sort-dropdown"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="Teacher_reviewed">Teacher Reviewed</option>
              <option value="Ai_graded">Ai Graded</option>
            </select>
          </div>
        )}

        <TableView
          sortBy={sortBy}
          ieltsType={ieltsType}
          taskType={taskType}
          status={status}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}