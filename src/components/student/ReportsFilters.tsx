
// Import the ViewData type used by the Studen Reports component
import type { ReportsFilters as FiltersViewData} from "../../viewData/student/StudentReportsViewData";


// ReportsFilters is a presentational component responsible for rendering
// the filter controls on the Student Reports page.
type ReportsFilterProps = {
  filters: FiltersViewData;  // Props include 'title'(str), 'selected'(str), and 'options'(str[]) for both IELTS Type and Task Type filters
};

export function ReportsFilters({ filters }: ReportsFilterProps) {
  return (
    <section>
      {/* Render IELTS Type filter */}
      <div>
        <label>{filters.ieltsType.title}</label>
        <select value = {filters.ieltsType.selected}>
          {filters.ieltsType.options.map((option) => (
            <option key = {option.value} value = {option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Render Task Type filter */}
      <div>
        <label>{filters.taskType.title}</label>
        <select value = {filters.taskType.selected}>
          {filters.taskType.options.map((option) => (
            <option key = {option.value} value = {option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}