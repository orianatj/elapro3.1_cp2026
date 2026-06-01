import { BsFiles, BsGraphUpArrow, BsGraphDownArrow, BsArrowDownUp } from "react-icons/bs";
import { StatsSummary } from "../../studentDashboard/StatsSummary";
import './studentdb.css';
import { FilterBar } from "../../studentDashboard/StudentChartFilter";
import { useState } from "react";
import type { IeltsType, RuntimeFilter, TaskType } from "../../types/student/StudentDashboard";
import { ProgressTracking } from "../../studentDashboard/ProgressTracking";
import { useAuth } from "../../hooks/useAuth";
import { GreetingBanner } from "../../studentDashboard/GreetingBanner";
import type { FilterKey } from "../../types/student/StudentDashboard";
import { IELTS_TYPE_OPTIONS, TASK_TYPE_OPTIONS } from "../../constants/studentProgressChartConfig";
import { useStudentProgressSummary } from "../../hooks/useStudentProgressSummary";
import type { StatCard } from "../../types/student/StudentDashboard";
import { EmptyState } from "../../common/EmptyState";




export default function StudentDashboardPage() {

    // Fetch current user's details 
    const { user } = useAuth();

    const statsSummaryQuery = useStudentProgressSummary();

    const summaryStats = statsSummaryQuery.data;

    const [ieltsType, setIeltsType] = useState<IeltsType>();

    const [taskType, setTaskType] = useState<TaskType>();


    if (!user) {
        return <div>Unable to load user data.</div>;
    };

    if (statsSummaryQuery.isLoading) {

        return (
            <div>Loading chart...</div>
        );
    }

    if (statsSummaryQuery.error) {

        const errorMessage = statsSummaryQuery.error.message

        return (
            <p className="auth-error">{errorMessage}</p>
        )
    }

    if (!summaryStats) {
        return (<EmptyState title="Complete some submissions to view summary statistics" message="" />)
    }

    const statCards: StatCard[] = [

        { label: "Total Submissions", value: summaryStats.totalSubmissions, icon: BsFiles },

        { label: "Highest Score", value: summaryStats.highestScore, icon: BsGraphUpArrow },

        { label: "Lowest Score", value: summaryStats.lowestScore, icon: BsGraphDownArrow },

        { label: "Average Score", value: summaryStats.averageScore, icon: BsArrowDownUp }
    ]

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



    return (

        <div className="dashboard-container">
            <div><GreetingBanner name={user.firstName} /></div>
            <div><StatsSummary stats={statCards} /></div>

            <div className="dashboard-content">

                <div className="filters-container">
                    <FilterBar filters={filters} onSelect={handleFilterChange} />
                </div>

                <ProgressTracking userId={user.userId} ieltsType={ieltsType} taskType={taskType} />
            </div>
        </div>
    )
};