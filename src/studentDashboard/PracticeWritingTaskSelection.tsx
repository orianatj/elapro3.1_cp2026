
import { FilterGroup } from "./FilterGroup"
import type { StudentFilter, IeltsType, TaskType } from "../types/student/common/StudentFilter";

// Props for the component received from page viewData
type PracticeTaskSelectionProps = {
    ieltsFilter: StudentFilter<IeltsType | undefined>;
    taskFilter: StudentFilter<TaskType | undefined>;
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

    // Button disabled until both selections are made
    const isDisabled = !ieltsFilter.selected || !taskFilter.selected;

    // Apply constraint: Academic cannot have Task 2
    const constraintTaskFilter = {
        ...taskFilter,
        options: taskFilter.options.map((option) => {

            if (ieltsFilter.selected === "academic" && option.value === "task-two") {
                return {...option, disabled: true};
            }

            return {...option, disabled:false}
        })
    };

    // Reverse constraint: Task 2 cannot have Academic
    const constraintIeltsFilter = {
        ...ieltsFilter,
        options: ieltsFilter.options.map((option) => {

            if (taskFilter.selected === "task-two" && option.value === "academic") {
                return {...option, disabled: true};
            }

            return {...option, disabled:false}
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