
// Import the generic reusable Table component
import { Table } from "../common/TableView";

import { useNavigate } from "react-router-dom";

import { canShowScore } from "../utils/gradingStatus";

// Import the ViewData types used by this component
import type {
  SubmissionsTable as TableViewData,
  SubmissionsFilters as FiltersViewData
} from "../types/student/StudentSubmissionsViewData";

import type { IeltsType, TaskType } from "../types/student/common/StudentFilter";

import {
  ieltsTypeLabels,
  taskTypeLabels,
  gradingStatusLabels
} from "../utils/studentSubmissionLabels";

import { SubmissionsFilters } from "./SubmissionsFilters";

// SubmissionsTableProps defines the data contract for the SubmissionsTable component.
// It receives an array of report rows prepared by the ViewModel.
type SubmissionsTableProps = {
  table: TableViewData;
  filters: FiltersViewData;
  actions: {
    setIeltsType: (ieltsType: IeltsType | "all") => void;
    setTaskType: (taskType: TaskType | "all") => void;
  };
};

// SubmissionsTable is a presentational component responsible for rendering
// the submissions table on the Student Submissions page.
export function SubmissionsTable({ table, filters, actions }: SubmissionsTableProps) {

  const navigate = useNavigate();

  const rows = table.rows;

  // Define static and Submissions specific table headers
  const tableHeaders = [
    "Date",
    "Question Type",

    // IELTS and Task filters inside header  
    <SubmissionsFilters
      key="ielts-filter"
      filters={filters}
      actions={actions}
      showTask={false}
    />,
    <SubmissionsFilters
      key="task-filter"
      filters={filters}
      actions={actions}
      showIelts={false}
    />,

    "Status",
    "Score",
    "Analysis Report"
  ];

  return (
    <section className="submissions-table">
      <Table headers={tableHeaders}>

        {/* TODO: Replace with real data mapping once backend integration is complete. Currently uses mock data for styling purposes. */}
        {rows.map((row) => (
          <tr key={row.submissionId}>
            <td>{row.date}</td>
            <td>{row.questionType}</td>
            <td>{ieltsTypeLabels[row.ieltsType]}</td>
            <td>{taskTypeLabels[row.taskType]}</td>
            <td>
              <span className={`status-badge ${row.status}`}>
                {gradingStatusLabels[row.status]}
              </span>
            </td>
            {/* Display score or "-" if not available */}
            <td>{canShowScore(row.status) ? row.score : "-"}</td>
            <td>
              {/* Navigate to Submission Analysis page using submissionId */}
              <button
                onClick={() => navigate(`../submission/${row.submissionId}`)}
              >
                View Analysis
              </button>
            </td>

          </tr>
        ))}
      </Table>
    </section>
  );
}