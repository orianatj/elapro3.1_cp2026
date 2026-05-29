import type { StudentFilter } from "../types/student/common/StudentFilter";

type FilterGroupProps<T extends string> = {
    // Array of filters to render (e.g. IELTS type + Task type)
    filters: StudentFilter<T>[];

    // onChange handler so parent can react to selection changes
    onChange: (title: string, value: T) => void

    // Placeholder shown when no option is selected (defaults to "Please Select")
    placeholder?: string
};

/* Renders a group of dropdown filters using the StudentFilter data structure.
 * Each filter includes:
 * - label (title)
 * - select dropdown
 * - placeholder for unselected state
 * - mapped options from backend-ready FilterOption
 */
export function FilterGroup<T extends string>({
    filters,
    onChange,
    placeholder = "Please Select",
}: FilterGroupProps<T>) {
    return (
        <div className="filter-group">

            {/* Iterates over each filter (e.g. IELTS Type, Task Type)
            to render a labeled dropdown container */}
            {filters.map((filter) => (
                <div key={filter.title} className="filter-item">

                    <label>{filter.title}</label>

                    <select
                        className="filter-dropdown"
                        value={filter.selected ?? ""}

                        onChange={(event) => {
                            const rawValue = event.target.value;
                            const newValue = rawValue as T;

                            onChange(filter.title, newValue);
                        }}
                    >

                        {/* Placeholder */}
                        <option value="">
                            {placeholder}
                        </option>

                        {/* Options */}
                        {filter.options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={!!option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}

                    </select>
                </div>
            ))}
        </div>
    )
}