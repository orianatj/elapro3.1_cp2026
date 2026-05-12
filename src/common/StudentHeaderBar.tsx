import "./studentheaderbar.css";
import { PageHeaderView } from "./PageHeaderView";
import type { PageHeaderViewData } from "../types/common/PageHeaderDTO";

// StudentHeaderBar is a reusable component that renders the page header section for student pages.
type StudentHeaderBarProps = {
    header: PageHeaderViewData;
};  


// Shared presentational header used across student-facing pages.
// Renders the page title and breadcrumb inside a styled header bar.
export function StudentHeaderBar({ header }: StudentHeaderBarProps) {
    return (
        <div className="student-header-bar">
            <PageHeaderView header={header} />
        </div>
    );
}