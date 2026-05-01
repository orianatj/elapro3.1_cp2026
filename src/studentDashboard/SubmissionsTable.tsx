
// Import the generic reusable Table component
import { Table } from "../common/TableView";

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
  return (
    <section className="submissions-table">
      <Table headers={tableHeaders}>
        {table.rows.map((row) => (
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