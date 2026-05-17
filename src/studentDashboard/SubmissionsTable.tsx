
// Import the generic reusable Table component
import { Table } from "../common/TableView";

import { canShowScore } from "../utils/gradingStatus";

// Import the ViewData types used by this component
import type { SubmissionsTable as TableViewData } from "../types/student/StudentSubmissionsViewData";
import {
  ieltsTypeLabels,
  taskTypeLabels,
  gradingStatusLabels
} from "../utils/studentSubmissionLabels";

// SubmissionsTableProps defines the data contract for the SubmissionsTable component.
// It receives an array of report rows prepared by the ViewModel.
type SubmissionsTableProps = {
  table: TableViewData;
};

// Define static and Submissions specific table headers
const tableHeaders = [
  "Date",
  "Essay Type",

  // IELTS Type filter rendered inline within the table header
  <label>
    IELTS Type
    <select>
      <option value="all">All</option>
      <option value="academic">Academic</option>
      <option value="general">General</option>
    </select>
  </label>,

  // Task Type filter rendered inline within the table header
  <label>
    Task Type
    <select>
      <option value="all">All</option>
      <option value="task1">Task 1</option>
      <option value="task2">Task 2</option>
    </select>
  </label>,

  "Status",
  "Score",
  "Analysis Report"
];

// SubmissionsTable is a presentational component responsible for rendering
// the submissions table on the Student Submissions page.
export function SubmissionsTable({ table }: SubmissionsTableProps) {

  const rows = table.rows;

  return (
    <section className="submissions-table">
      <Table headers={tableHeaders}>

        {/* TODO: Replace with real data mapping once backend integration is complete. Currently uses mock data for styling purposes. */}
        {rows.map((row) => (
          <tr key={row.submissionId}>
            <td>{row.date}</td>
            <td>{row.essayType}</td>
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
              {/* TODO: replace with navigation once routing exists */}
              <button>View Analysis</button>
            </td>
          </tr>
        ))}
      </Table>
    </section>
  );
}