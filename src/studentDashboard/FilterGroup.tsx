import type { StudentFilter } from "../types/student/common/StudentFilter";

type FilterGroupProps<T extends string | undefined> = {
        filters: StudentFilter<T>[];  // Array of filters to render (e.g. IELTS type + Task type)
    placeholder?: string              // Optional custom placeholder text (defaults to "Please Select")
};

/* Renders a group of dropdown filters using the StudentFilter data structure.
 * Each filter includes:
 * - label (title)
 * - select dropdown
 * - placeholder for unselected state
 * - mapped options from backend-ready FilterOption
 */
export function FilterGroup<T extends string | undefined>({
    filters,
    placeholder = "Please Select"
}: FilterGroupProps<T>) {
    return (
        <div className="filter-group">

            {filters.map((filter) => (
                <div key={filter.title} className="filter-item">

                    <label>{filter.title}</label>

                    <select
                        className="filter-dropdown"
                        value={filter.selected ?? ""}>
                        {/* Placeholder */}
                        <option value="" disabled>
                            {placeholder}
                        </option>

                        {/* Options */}
                        {filter.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}

                    </select>
                </div>
            ))}
        </div>
    )
}