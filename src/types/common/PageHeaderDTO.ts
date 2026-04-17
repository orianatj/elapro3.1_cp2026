// Page header information displayed at the top of the page,
// including the title and breadcrumb navigation context
export type PageHeaderViewData = {
  title: string;             // Page title, e.g. "Submission Analysis"
  breadcrumb: Breadcrumb[];  // Breadcrumb navigation hierarchy
};

// Represents a single breadcrumb item in the navigation hierarchy
export type Breadcrumb = {
  label: string; // Display label for the breadcrumb, e.g. "Home", "Submissions"
  link?: string;  // Optional URL for navigation; if omitted the segment is not clickable
};

