
type FilterData = {
    title: string;        // Label shown above dropdown. ex. "Choose an IELTS Type"
    selected: string;     // Current selected value. ex. 'General/Task 1/Weekly'
    options: string[];    // Dropdown options. ex. ['General', 'Academic']
    placeholder?: string  // Optional placeholder for unselected state. ex. "Please select an option"
};

type FilterBarProps = {
    filters: FilterData[];
};

export function FilterBar({ filters }: FilterBarProps) {
    return (
        <div className="filter-bar">
            {filters.map((filter) => (
                <FilterDropdown
                    key={filter.title}
                    title={filter.title}
                    selected={filter.selected}
                    options={filter.options}
                    placeholder={filter.placeholder}>
                </FilterDropdown>
            ))}
        </div>
    );
};

// Extend FilterData with optional onChange behaviour
type FilterDropdownProps = FilterData & {
    onChange?: (title: string, value: string | undefined) => void;
};

// Reusable dropdown filter component
function FilterDropdown({ title, selected, options, placeholder, onChange }: FilterDropdownProps) {
    return (
        <div className="filter-item">
            <label>{title}</label>

            {/* Controlled select input (fixes React warning) */}
            <select className="filter-dropdown" 
            value={selected ?? ""}
            onChange={(e) => {
                const value = e.target.value || undefined; // Convert empty string to undefined
                onChange?.(title, value);  // Only passes title and value if parent handler is provided
            }}
            >
                {/* Placeholder shown when no selection is made */}
                <option value="" disabled>
                    {placeholder ?? "--Please choose an option--"}
                </option>

                {/* Render dropdown options */}
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};