
type FilterData = {
    title: string;  // ex. "Choose an IELTS Type"
    selected: string;  // ex. 'General/Task 1/Weekly'
    options: string[];
    placeholder?: string  // ex. "Please select an option" (optional)
};

type FilterBarProps = {
    filters: FilterData[];
};

export function FilterBar({ filters }: FilterBarProps) {
    return (
        <div className="filter-bar">
            {filters.map((filter) => (
                <ChartFilter
                    key={filter.title}
                    title={filter.title}
                    selected={filter.selected}
                    options={filter.options}
                    placeholder={filter.placeholder}>
                </ChartFilter>
            ))}
        </div>
    );
};

type ChartFilterProps = FilterData;

function ChartFilter({ title, selected, options, placeholder }: ChartFilterProps) {
    return (
        <div className="filter-item">
            <label>{title}</label>
            <select className="filter-dropdown" value={selected ?? ""}>
                <option value="" disabled>
                    {placeholder ?? "--Please choose an option--"}
                </option>

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