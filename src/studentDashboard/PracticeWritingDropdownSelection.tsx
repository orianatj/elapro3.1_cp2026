
import { useState } from "react";

import { FilterGroup } from "./FilterGroup"
import type { StudentFilter, IeltsType, TaskType } from "../types/student/common/StudentFilter";

// Props for the component received from page viewData
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

    // Local state to track current selections (initialised from viewData)
    const [ielts, setIelts] = useState < IeltsType | undefined> (ieltsFilter.selected);
    const [task, setTask] = useState<TaskType | undefined> (taskFilter.selected);

    // Button disabled until both selections are made
    const isDisabled = !ielts || !task;

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
                        ...ieltsFilter,
                        selected: ielts
                    },
                    {
                        ...taskFilter,
                        selected: task
                    } 
                ]}

                // Handle dropdown changes coming from FilterGroup
                onChange={(title: string, value: IeltsType | TaskType | undefined) => {

                    if (title === ieltsFilter.title) {
                        setIelts(value as IeltsType | undefined)
                    }

                    if (title === taskFilter.title) {
                        setTask(value as TaskType | undefined)
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