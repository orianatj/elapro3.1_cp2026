import type { StudentFilter } from "../types/student/common/StudentFilter";

type FilterGroupProps<T extends string | undefined> = {
    // Array of filters to render (e.g. IELTS type + Task type)
    filters: StudentFilter<T>[];

    // onChange handler so parent can react to selection changes
    onChange: (title: string, value: T | undefined) => void

    // Optional custom placeholder text (defaults to "Please Select")
    placeholder?: string
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
    onChange,
    placeholder = "Please Select"
}: FilterGroupProps<T>) {
    return (
        <div className="filter-group">

            {filters.map((filter) => (
                <div key={filter.title} className="filter-item">

                    <label>{filter.title}</label>

                    <select
                        className="filter-dropdown"
                        value={filter.selected ?? ""}

                        onChange={(event) => {
                            const value = event.target.value;

                            onChange(
                                filter.title,
                                value === "" ? undefined : (value as T)
                            );
                        }}
                    >

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