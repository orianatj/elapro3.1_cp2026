import { IoDocumentsOutline } from "react-icons/io5";
import { BsArrowUp, BsArrowDown, BsArrowDownUp } from "react-icons/bs";
import { StatsSummary } from "../../studentDashboard/StatsSummary";
import './studentdb.css';
import { FilterBar } from "../../studentDashboard/StudentFilter";
import { CriterionSelector } from "../../studentDashboard/CriterionToggles";


const STATS = [
    { label: "Total Submissions", value: 15, icon: <IoDocumentsOutline /> },
    { label: "Highest Score", value: 33, icon: <BsArrowUp /> },
    { label: "Lowest Score", value: 0, icon: <BsArrowDown /> },
    { label: "Average Score", value: 0, icon: <BsArrowDownUp /> }
];

const CHART_DATA = [
    { ielts: "general", task: "task one", week: "05/01", overallScore: 6, taskAchievement: 5.5, GrammaticalRA: 6, lexicalResource: 5, coheranceAndCohesion: 7 },
    { ielts: "general", task: "task one", week: "19/01", overallScore: 5, taskAchievement: 4, GrammaticalRA: 4, lexicalResource: 5, coheranceAndCohesion: 6 },
    { ielts: "general", task: "task one", week: "26/01", overallScore: 5, taskAchievement: 4, GrammaticalRA: 4, lexicalResource: 5, coheranceAndCohesion: 6 },
]

const CRITERIA = [
    "Overall Score",
    "Task Achievement",
    "Grammatical Range & Accuracy",
    "Lexical Resource",
    "Coherence & Cohesion",
];


export default function StudentDashboardPage() {
    return (

        <div className="container">
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

                },
                {
                    title: "View By:",
                    selected: "",
                    options: ["Weekly", "Monthly", "Quarterly"]

                }
            ]} />
                <CriterionSelector toggles={CRITERIA} />

            </div>
        </div>
    )
};