
// Import the shared PageHeaderView component
import { PageHeaderView } from "../../common/PageHeaderView";

// Import page-specific child components,
// responsible for rendering distinct sections of the page.
import { SubmissionsFilters } from "../../studentDashboard/SubmissionsFilters";
import { SubmissionsTable } from "../../studentDashboard/SubmissionsTable";

// Import the page-level data hook responsible for fetching submissions and producing ViewData
import { useStudentSubmissions } from "../../hooks/useStudentSubmissions";

export default function SubmissionsPage() {
    const { viewData, isPending, error } =
        useStudentSubmissions("debug-UserId");

    // Explicitly handle loading and error states to ensure the page doesn't attempt to render with incomplete data.
    // Render loading state while student submissions are being fetched
    if (isPending) {
        return <div>
            Loading submissions...
        </div>;
    }

    // Render error state if there was an issue loading submissions
    if (error) {
        return <div>
            Error loading submissions
        </div>;
    }

    // Guard against rendering before ViewData is available
    if (!viewData) {
        return null;
    }

    // Render the main content once all data is available
    return (
        <div className="student-submissions-page">
            {/* Page header: title and breadcrumb navigation */}
            <PageHeaderView header={viewData.pageHeader} />

            {/* Filters: IELTS and Task filtering controls */}
            <SubmissionsFilters filters={viewData.filters} />

            {/* Submissions table: displays the list of student submissions based on current filters */}
            <SubmissionsTable table={viewData.submissionsTable} />
        </div>
    );
};