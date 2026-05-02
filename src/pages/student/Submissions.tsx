
// Import the shared PageHeaderView component
import { PageHeaderView } from "../../common/PageHeaderView";

// Import page-specific child components,
// responsible for rendering distinct sections of the page.
import { SubmissionsFilters } from "../../studentDashboard/SubmissionsFilters";
import { SubmissionsTable } from "../../studentDashboard/SubmissionsTable";

// Import the page-level data hook responsible for fetching submissions and producing ViewData
import { useStudentSubmissions } from "../../hooks/useStudentSubmissions";

// Page entry component for the Student Submissions screen.
export function SubmissionsPage() {
    // temporary userId placeholder
    // TODO: Replace with actual user ID retrieval logic when available
    const userId = "currentUserId";

    // Consume the student submissions data hook, which owns
    // data fetching, filtering, and ViewData construction.
    const { viewData,
        isLoading,
        error,
        actions,
    } = useStudentSubmissions(userId);

    // Render a simple loading state while submissions data is being fetched.
    if (isLoading) {
        return (
            <div className="student-submissions-page">
                Loading Submissions...
            </div>
        );
    }

    // Render an error state if data retrieval fails.
    if (error) {
        return (
            <div className="student-submissions-page">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="student-submissions-page">
            {/* The page is composed of a header, filters, and a table. 
            Each section receives only the data it needs from the ViewData. */}
            <PageHeaderView header={viewData.pageHeader} />
            <SubmissionsFilters filters={viewData.filters}
            //TODO: wire actions to filters and table components once implemented
            // onIeltsTypeChange={actions.setIeltsType}
            // onTaskTypeChange={actions.setTaskType}
            />
            <SubmissionsTable table={viewData.submissionsTable} />
        </div>
    );
}   