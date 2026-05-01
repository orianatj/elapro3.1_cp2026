
// Import the page-level ViewData contract for the Student Submissions page,
// to define the complete UI-ready data structure expected by this component.
import type { StudentSubmissions } from "../../types/student/StudentSubmissionsViewData";

// Import the shared PageHeaderView component
import { PageHeaderView } from "../../common/PageHeaderView";

// Import page-specific child components,
// responsible for rendering distinct sections of the page.
import { SubmissionsFilters } from "../../studentDashboard/SubmissionsFilters";
import { SubmissionsTable } from "../../studentDashboard/SubmissionsTable";

// Define the Props type for the page-level component.
type Props = {
    viewData: StudentSubmissions;
}

// Page entry component for the Student Submissions screen.
export function SubmissionsPage({viewData}: Props) {
    return (
        <div className = "student-submissions-page">
            <PageHeaderView header = {viewData.pageHeader} />
            <SubmissionsFilters filters = {viewData.filters} />
            <SubmissionsTable table = {viewData.submissionsTable} />
        </div>
    );
}   