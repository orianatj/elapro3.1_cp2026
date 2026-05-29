
// Import the ViewData type used by the Student Submissions component
import type { IeltsType, TaskType } from "../types/student/common/StudentFilter";
import type { SubmissionsFilters as FiltersViewData } from "../types/student/StudentSubmissionsViewData";


// SubmissionsFilters is a presentational component responsible for rendering
// the filter controls on the Student Submissions page.
type SubmissionsFilterProps = {
  filters: FiltersViewData;  // Props include 'title'(str), 'selected'(str), and 'options'(str[]) for both IELTS Type and Task Type filters
  actions: {
    setIeltsType: (ieltsType: IeltsType | "all") => void; // Callback to update the selected IELTS Type filter
    setTaskType: (taskType: TaskType | "all") => void; // Callback to update the selected Task Type filter
  };
  showIelts?: boolean;
  showTask?: boolean;
};

export function SubmissionsFilters({ filters, actions, showIelts, showTask }: SubmissionsFilterProps) {
  return (
    <section className="submissions-filters">
      {/* Render IELTS Type filter */}
      {(showIelts ?? true) && (
        <div>
          {/* e.g. "Choose an IELTS Type" */}
          <label>{filters.ieltsType.title}</label>
          {/* e.g. "academic", "general", or "all" */}
          <select value={filters.ieltsType.selected}
            onChange={(e) => actions.setIeltsType(e.target.value as IeltsType | "all")}>
            {filters.ieltsType.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Render Task Type filter */}
      {(showTask ?? true) && (
        <div>
          {/* e.g. "Choose a Task Type" */}
          <label>{filters.taskType.title}</label>
          {/* e.g. "task1", "task2", or "all" */}
          <select value={filters.taskType.selected}
            onChange={(e) => actions.setTaskType(e.target.value as TaskType | "all")}>
            {filters.taskType.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </section>
  );
}