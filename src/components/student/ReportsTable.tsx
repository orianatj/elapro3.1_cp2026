
// Import the generic reusable Table component
import { Table } from "../common/TableView";

// Import the ViewData type used by this component
import type { ReportsTable as TableViewData } from "../../viewData/student/StudentReportsViewData";

// ReportsTableProps defines the data contract for the ReportsTable component.
// It receives an array of report rows prepared by the ViewModel.
type ReportsTableProps = {
  table: TableViewData;
};

// Define static and Reports specific table headers
const tableHeaders = ["Date", "Essay Type", "IELTS Type", "Task Type", "Score", "Analysis Report"];

// ReportsTable is a presentational component responsible for rendering
// the reports table on the Student Reports page.
export function ReportsTable({ table }: ReportsTableProps) {
  return (
    <section>      
      <Table headers = {tableHeaders}>
        {table.rows.map((row) => (
          <tr key = {row.reportId}>
            <td>{row.date}</td>
            <td>{row.essayType}</td>
            <td>{row.ieltsType}</td>
            <td>{row.taskType}</td>
            <td>{row.score}</td>
            <td>
              {/* TODO: replace with navigation once routing exists */}
              <button>View Report</button>
            </td>
          </tr>
        ))}
      </Table> 
    </section>
  );
}