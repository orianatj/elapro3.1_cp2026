import { IoDocumentsOutline } from "react-icons/io5";
import { BsArrowUp, BsArrowDown, BsArrowDownUp } from "react-icons/bs";
import { StatsSummary } from "../../studentDashboard/StatsSummary";
import './studentdb.css';
import { FilterBar } from "../../studentDashboard/StudentFilter";
import { useState } from "react";
import type { IeltsType, RuntimeFilter, TaskType } from "../../types/common/StudentDashboard";
import { ProgressTracking } from "../../studentDashboard/ProgressTracking";
import { useAuth } from "../../hooks/useAuth";
import { GreetingBanner } from "../../studentDashboard/GreetingBanner";
import type { FilterKey } from "../../types/common/StudentDashboard";
import { IELTS_TYPE_OPTIONS, TASK_TYPE_OPTIONS } from "../../constants/studentProgressChartConfig";


const STATS = [
    { label: "Total Submissions", value: 15, icon: <IoDocumentsOutline /> },
    { label: "Highest Score", value: 33, icon: <BsArrowUp /> },
    { label: "Lowest Score", value: 0, icon: <BsArrowDown /> },
    { label: "Average Score", value: 0, icon: <BsArrowDownUp /> }
];



export default function StudentDashboardPage() {

    // Fetch current user's details 
    const { user } = useAuth();

    const [ieltsType, setIeltsType] = useState<IeltsType>();

    const [taskType, setTaskType] = useState<TaskType>();

    const availableIeltsOptions = IELTS_TYPE_OPTIONS.map((option) => {

        return {
            ...option,

            disabled:
                taskType === "task1" && option.value === "academic"
        };
    });

    const availableTaskOptions = TASK_TYPE_OPTIONS.map((option) => {

        return {
            ...option,

            disabled:
                ieltsType === "academic" && option.value === "task1"
        };
    })

    const filters: RuntimeFilter[] = [

        {
            filterKey: "ieltsType",
            label: "IELTS Type",
            selected: ieltsType,
            options: availableIeltsOptions
        },

        {
            filterKey: "taskType",
            label: "Task Type",
            selected: taskType,
            options: availableTaskOptions

        }
    ]

    function handleFilterChange(key: FilterKey, value: string) {

        if (key === "ieltsType") {

            setIeltsType(value as IeltsType)
        };

        if (key === "taskType") {

            setTaskType(value as TaskType)
        };
    }

    if (!user) {
        return <div>Unable to load user data.</div>;
    };

    return (

        <div className="container">
            <div><GreetingBanner name={user.firstName} /></div>
            <div><StatsSummary stats={STATS} /></div>
            <div>
                <FilterBar filters={filters} onSelect={handleFilterChange} />
            </div>
            <ProgressTracking userId={user.userId} ieltsType={ieltsType} taskType={taskType} />
        </div>
    )
};