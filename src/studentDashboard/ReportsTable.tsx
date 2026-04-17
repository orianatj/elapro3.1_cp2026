// Import the ViewData type used by this component
import type { ReportsTable as TableViewData } from "../../viewData/student/StudentReportsViewData";

// ReportsTableProps defines the data contract for the ReportsTable component.
// It receives an array of report rows prepared by the ViewModel.
type ReportsTableProps = {
  table: TableViewData;
};

// ReportsTable is a presentational component responsible for rendering
// the reports table on the Student Reports page.
export function ReportsTable({ table }: ReportsTableProps) {
  return (
    <section>
      <table>
        {/* Table header defining column titles */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Essay Type</th>
            <th>IELTS Type</th>
            <th>Task Type</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* Table body rendering a row for each report in the data */}
        <tbody>
          {table.rows.map(row => (
            <tr key={row.reportId}>
              <td>{row.date}</td>
              <td>{row.essayType}</td>
              <td>{row.ieltsType}</td>
              <td>{row.taskType}</td>
              <td>{row.score}</td>

              {/* Action column with a button to navigate to the submission analysis report */}
              <td>
                {/* TODO: Replace with navigation handler once routing exists */}
                <button>View Report</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}