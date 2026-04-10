// Import the page-level ViewData contract for the Student Reports page,
// to define the complete UI-ready data structure expected by this component.
import type { StudentReports } from "../../viewData/student/StudentReportsViewData";


// Import page-specific child components,
// responsible for rendering distinct sections of the page.
import { ReportsHeader } from "./ReportsHeader";
import { ReportsFilters } from "./ReportsFilters";
import { ReportsTable } from "./ReportsTable";

// Define the Props type for the page-level component.
type Props = {
    viewData: StudentReports;
}

// Page entry component for the Student Reports screen.
export function StudentReportsPage({viewData}: Props) {
    return (
        <div>
            <ReportsHeader header = {viewData.pageHeader} />
            <ReportsFilters filters = {viewData.filters} />
            <ReportsTable table = {viewData.reportsTable} />
        </div>
    );
}   