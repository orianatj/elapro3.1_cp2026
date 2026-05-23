import { FilterGroup } from "./FilterGroup"
import type { StudentFilter, IeltsType, TaskType } from "../types/student/common/StudentFilter";

type PracticeTaskSelectionProps = {
    ieltsFilter: StudentFilter<IeltsType | undefined>;
    taskFilter: StudentFilter<TaskType | undefined>;
    onGenerate?: () => void;
}

export function PracticeTaskSelectionGroup({
    ieltsFilter,
    taskFilter,
    onGenerate
}: PracticeTaskSelectionProps) {

    const isDisabled = !ieltsFilter.selected || !taskFilter.selected;

    return (
        <div className="practice-task-selection">

            {/* Section Header */}
            <div className="section-header">
                <h4>Generate Question</h4>
            </div>

            {/* Filters */}
            <FilterGroup
                filters={[
                    ieltsFilter,
                    taskFilter
                ]}
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