
type FilterData = {
    title: string;  // ex. "Choose an IELTS Type"
    selected: string;  // ex. 'General/Task 1/Weekly'
    options: string[];
};

type FilterBarProps = {
    filters: FilterData[];
}
export function FilterBar({ filters }: FilterBarProps) {
    return (
        <div className="filter-bar">
            {filters.map((filter) => (
                <ChartFilter
                    key={filter.title}
                    title={filter.title}
                    selected={filter.selected}
                    options={filter.options}>
                </ChartFilter>
            ))}
        </div>
    );
}

type ChartFilterProps = FilterData;

function ChartFilter({ title, selected, options }: ChartFilterProps) {
    return (
        <div className="filter-item">
            <label>{title}</label>
            <select className="filter-dropdown" value={selected}>
                <option>--Please choose an option--</option>
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
}