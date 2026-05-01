
// Import the ViewData type used by the Student Submissions component
import type { SubmissionsFilters as FiltersViewData } from "../types/student/StudentSubmissionsViewData";


// SubmissionsFilters is a presentational component responsible for rendering
// the filter controls on the Student Submissions page.
type SubmissionsFilterProps = {
  filters: FiltersViewData;  // Props include 'title'(str), 'selected'(str), and 'options'(str[]) for both IELTS Type and Task Type filters
};

export function SubmissionsFilters({ filters }: SubmissionsFilterProps) {
  return (
    <section className="submissions-filters">
      {/* Render IELTS Type filter */}
      <div>
        {/* e.g. "Choose an IELTS Type" */}
        <label>{filters.ieltsType.title}</label>
        {/* e.g. "academic", "general", or "all" */}
        <select value={filters.ieltsType.selected}>
          {filters.ieltsType.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Render Task Type filter */}
      <div>
        {/* e.g. "Choose a Task Type" */}
        <label>{filters.taskType.title}</label>
        {/* e.g. "task-one", "task-two", or "all" */}
        <select value={filters.taskType.selected}>
          {filters.taskType.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}