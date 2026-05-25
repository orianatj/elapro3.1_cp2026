import { IoDocumentsOutline } from "react-icons/io5";
import { BsArrowUp, BsArrowDown, BsArrowDownUp } from "react-icons/bs";
import { StatsSummary } from "../../studentDashboard/StatsSummary";
import './studentdb.css';
import { FilterBar } from "../../studentDashboard/StudentFilter";
import { useState } from "react";
import type { IeltsType, TaskType } from "../../types/common/Dashboard";
import { ProgressTracking } from "../../studentDashboard/ProgressTracking";
import { useAuth } from "../../hooks/useAuth";
import { GreetingBanner } from "../../studentDashboard/GreetingBanner";


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

    if (!user) {
        return <div>Unable to load user data.</div>;
    }

    return (

        <div className="container">
            <div><GreetingBanner name={user.firstName} /></div>
            <div><StatsSummary stats={STATS} /></div>
            <div><FilterBar filters={[
                {
                    title: "Choose an IELTS Type:",
                    selected: "",
                    options: ["General", "Academic"]
                },
                {
                    title: "Choose a Task Type:",
                    selected: "",
                    options: ["Task 1", "Task 2"]

                }
            ]} />
            </div>
            <ProgressTracking userId={user.userId} ieltsType={ieltsType} taskType={taskType} />
        </div>
    )
};