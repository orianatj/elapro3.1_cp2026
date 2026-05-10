
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

    return (

        <>
            <h1>This is the Submissions Page</h1>
        </>
    )
};