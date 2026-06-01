import { useAuth } from "../../hooks/useAuth";

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
    const { user } = useAuth();

    if (!user) {
        return <div>Unable to load user data.</div>;
    }

    const { viewData, isPending, isError, error, actions } =
        useStudentSubmissions(user.userId);


    // Delegate loading, error, and empty state handling to QueryStateHandler
    return (

        <QueryStateHandler
            isPending={isPending}
            isError={isError}
            error={error}
            data={viewData}
            emptyMessage="You have not made any submissions yet"
            isEmpty={(data) => !data.submissionsTable.rows.length}
            hasActiveFilters={(data) =>
                Object.values(data.filters).some(
                    (filter) => filter.selected !== "all"
                )
            }
        >

            {(data) => (
                <div className="student-submissions-page">

                    <StudentHeaderBar header={data.pageHeader} />

                    <div className="student-submissions-table">
                        <SubmissionsTable
                            table={data.submissionsTable}
                            filters={data.filters}
                            actions={actions}
                        />
                    </div>

                </div>
            )}
        </QueryStateHandler>

    );
};

