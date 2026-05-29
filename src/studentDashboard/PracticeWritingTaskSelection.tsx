
import { FilterGroup } from "./FilterGroup"
import type { StudentFilter, IeltsType, TaskType } from "../types/student/common/StudentFilter";

// Props for the component received from page viewData
type PracticeTaskSelectionProps = {
    ieltsFilter: StudentFilter<IeltsType>;
    taskFilter: StudentFilter<TaskType>;
    onIeltsTypeChange?: (value: IeltsType | undefined) => void;
    onTaskTypeChange?: (value: TaskType | undefined) => void;
    onGenerate?: () => void;
}

export function PracticeTaskSelectionGroup({
    ieltsFilter,
    taskFilter,
    onIeltsTypeChange,
    onTaskTypeChange,
    onGenerate
}: PracticeTaskSelectionProps) {

    // Get Task button disabled until both selections are made
    const isDisabled = !ieltsFilter.selected || !taskFilter.selected;

    // Business logic for interdependent dropdowns:
    const isAcademic = ieltsFilter.selected === "academic";
    const isTaskOne = taskFilter.selected === "task-one";

    // Apply constraint: Academic cannot have Task 1
    const constraintTaskFilter = {
        ...taskFilter,
        options: taskFilter.options.map((option) => {

            if (isAcademic && option.value === "task-one") {
                return { ...option, disabled: true };
            }

            return option;
        })
    };

    // Reverse constraint: Task 1 cannot have Academic
    const constraintIeltsFilter = {
        ...ieltsFilter,
        options: ieltsFilter.options.map((option) => {

            if (isTaskOne && option.value === "academic") {
                return { ...option, disabled: true };
            }

            return option;
        })
    };

    return (
        <div className="practice-task-selection">

            {/* Section Header */}
            <div className="section-header">
                <h4>Generate Question</h4>
            </div>

            {/* Filters */}
            <FilterGroup
                filters={[
                    {
                        ...constraintIeltsFilter,
                        selected: ieltsFilter.selected
                    },
                    {
                        ...constraintTaskFilter,
                        selected: taskFilter.selected
                    }
                ]}

                // Handle dropdown changes coming from FilterGroup
                onChange={(title: string, value: IeltsType | TaskType | undefined) => {

                    if (title === ieltsFilter.title) {
                        onIeltsTypeChange?.(value as IeltsType | undefined)
                    }

                    if (title === taskFilter.title) {
                        onTaskTypeChange?.(value as TaskType | undefined)
                    }
                }}
            />

            {/* Get Task Button */}
            <div className="get-task-button-container">
                <button
                    className="get-task-button"
                    onClick={onGenerate}
                    disabled={isDisabled}
                >
                    Get Task
                </button>
            </div>
        </div>
    )
}