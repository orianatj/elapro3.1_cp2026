
// Import shared header bar
import { StudentHeaderBar } from "../../common/StudentHeaderBar";

// Import page-specific SubmissionsTable child component.
import { SubmissionsTable } from "../../studentDashboard/SubmissionsTable";

// Import the page-level data hook responsible for fetching submissions and producing ViewData
import { useStudentSubmissions } from "../../hooks/useStudentSubmissions";

// Import the error handling utility to extract user-friendly messages from error objects
import { getErrorMessage } from "../../utils/errorHandling";

// Import page-specific styles
import './studentsubmissions.css';

export default function SubmissionsPage() {
    const { viewData, isPending, error, actions } =
        useStudentSubmissions("debug-UserId");

    // Explicitly handle loading and error states to ensure the page doesn't attempt to render with incomplete data.
    // Render loading state while student submissions are being fetched
    if (isPending) {
        return <div>
            Loading submissions...
        </div>;
    }

    // Render error states if there was an issue loading submissions
    if (error) {
        return (
            <div className="error-state">
                {getErrorMessage(error)}
            </div>
        );
    }

    // Guard against rendering before ViewData is available
    if (!viewData) {
        return <div className="empty-state">No submission data available.</div>;
    }

    // Render the main content once all data is available
    return (
        <div className="student-submissions-page">

            {/* Shared Page header: title and breadcrumb navigation */}
            <StudentHeaderBar header={viewData.pageHeader} />

            {/* Submissions table: displays the list of student submissions based on current filters */}
            <div className="student-submissions-table">
                <SubmissionsTable 
                table={viewData.submissionsTable} 
                filters={viewData.filters}
                actions={actions} />
            </div>
        </div>
    );
};