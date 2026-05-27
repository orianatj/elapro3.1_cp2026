import type { FilterKey, RuntimeFilter } from "../types/common/StudentDashboard";


// Define props for FilterBar component 
type FilterBarProps = {
    filters: RuntimeFilter[];
    onSelect: (key: FilterKey, value: string) => void;
};

export function FilterBar({ filters, onSelect }: FilterBarProps) {
    return (
        <div className="filter-bar">

            {filters.map((filter) => (

                <ChartFilter
                    key={filter.filterKey}
                    filterKey={filter.filterKey}
                    title={filter.label}
                    selected={filter.selected}
                    options={filter.options}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export type ChartFilterProps = {
    filterKey: FilterKey;
    title: string;
    selected?: string;
    options: RuntimeFilter["options"]
    onSelect: (key: FilterKey, value: string) => void;
};

function ChartFilter({ filterKey, title, selected, options, onSelect }: ChartFilterProps) {
    return (
        <div className="filter-item">
            <label>{title}</label>
            <select className="filter-dropdown"
                value={selected ?? ""}
                onChange={(event) => onSelect(filterKey, event.target.value)}
            >
                <option value="">
                    --Please choose an option--
                </option>

                {options.map((option) => (

                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >

                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};