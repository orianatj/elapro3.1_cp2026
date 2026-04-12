
import type { PageHeaderViewData } from "../../viewData/common/PageHeaderDTO";

// PageHeader is a presentational component responsible for rendering the header section of each page,
// that displays the title and breadcrumb navigation provided via the viewData from the parent page entry component
type PageHeaderProps = {
  header: PageHeaderViewData;
};


export function PageHeaderView({ header }: PageHeaderProps) {
  return (
    <header>
       {/* Page title */}
       <h1>{header.title}</h1>  
       
       {/* Breadcrumb navigation */}
       {/* TODO: Replace span with appropriate navigation element once routing exists */}
       <nav>
        {header.breadcrumb.map((breadcrumb, index) => (            
            <span key = {index}>
                {breadcrumb.label}
                {/* Add separator if not the last breadcrumb segment */}
                {index < header.breadcrumb.length - 1 && " > "}
            </span>
        ))}
       </nav>
    </header>
  );
}
