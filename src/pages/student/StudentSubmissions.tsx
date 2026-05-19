
// Import shared header bar
import { StudentHeaderBar } from "../../common/StudentHeaderBar";
import { QueryStateHandler } from "../../common/QueryStateHandler";

// Import page-specific SubmissionsTable child component.
import { SubmissionsTable } from "../../studentDashboard/SubmissionsTable";

// Import the page-level data hook responsible for fetching submissions and producing ViewData
import { useStudentSubmissions } from "../../hooks/useStudentSubmissions";

// Import page-specific styles
import './studentsubmissions.css';

export default function SubmissionsPage() {
    // Use the custom hook to fetch and prepare the ViewData for this page based on the current student.
    const { viewData, isPending, isError, error, actions } =
        useStudentSubmissions("debug-UserId");

    // Delegate loading, error, and empty state handling to QueryStateHandler
    return (
        <QueryStateHandler
            isPending={isPending}
            isError={isError}
            error={error}
            data={viewData}
            emptyMessage="No submission data available."
        >
            {
                // Render the main page content using the structured ViewData provided by the custom hook.
                // Only renders when data is available and there are no loading or error states.
                (data) => (
                    <div className="student-submissions-page">

                        {/* Shared Page header: title and breadcrumb navigation */}
                        <StudentHeaderBar header={data.pageHeader} />

                        {/* Submissions table: displays the list of student submissions based on current filters */}
                        <div className="student-submissions-table">
                            <SubmissionsTable
                                table={data.submissionsTable}
                                filters={data.filters}
                                actions={actions}
                            />
                        </div>
                    </div>
                )
            }
        </QueryStateHandler>
    );
};

