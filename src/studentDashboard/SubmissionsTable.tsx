
// Import the generic reusable Table component
import { Table } from "../common/TableView";

// TEMPORARY import mock Submission data for visual styling
import { mockSubmissionRows } from "./submissionTable.mock";

// Import the ViewData type used by this component
import type { SubmissionsTable as TableViewData } from "../types/student/StudentSubmissionsViewData";

// SubmissionsTableProps defines the data contract for the SubmissionsTable component.
// It receives an array of report rows prepared by the ViewModel.
type SubmissionsTableProps = {
  table: TableViewData;
};

// Define static and Submissions specific table headers
const tableHeaders = ["Date", "Essay Type", "IELTS Type", "Task Type", "Score", "Analysis Report"];

// SubmissionsTable is a presentational component responsible for rendering
// the submissions table on the Student Submissions page.
export function SubmissionsTable({ table }: SubmissionsTableProps) {

  // TODO: Remove mock data fallback once backend integration is complete. Currently allows the table to render with example data for styling purposes.
  const rows = table.rows.length > 0 ? table.rows : mockSubmissionRows;

  return (
    <section className="submissions-table">
      <Table headers={tableHeaders}>

        {/* TODO: Replace with real data mapping once backend integration is complete. Currently uses mock data for styling purposes. */}
        {rows.map((row) => (
          <tr key={row.submissionId}>
            <td>{row.date}</td>
            <td>{row.essayType}</td>
            <td>{row.ieltsType}</td>
            <td>{row.taskType}</td>
            {/* Display score or "-" if not available */}
            <td>{row.score ?? "-"}</td>
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