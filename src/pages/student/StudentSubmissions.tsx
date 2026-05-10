
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
    if (isPending) {
        return <div>Loading submissions...</div>;
    }

    if (error) {
        return <div>Error loading submissions</div>;
    }

    if (!viewData) {
        return null;
    }

    return (
        <>
            <PageHeaderView header={viewData.pageHeader} />
        </>
    )
};