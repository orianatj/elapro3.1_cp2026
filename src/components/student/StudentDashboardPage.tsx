// StudentDashboardPage.tsx
import "../../pages/student/studentdb.css";
import { IoDocumentsOutline} from "react-icons/io5";
import { BsArrowUp, BsArrowDown, BsArrowDownUp } from "react-icons/bs";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Build a static version of the student dashboard page using React components 
// Use top-down approach: start by building the components at the top of the hierarchy first 
// Type defines the structure of a summary score card 



export default function StudentDashboard(){
    return(
    <div className="container">
    <div><GreetingBanner name={STUDENT}/></div>
    <div><StatsSummary stats={STATS}/></div>
    <div><FilterBar filters={[
        {
            title:"Choose an IELTS Type:",
            selected:"", 
            options: ["General", "Academic"]
        },
        {   
            title:"Choose a Task Type:",
            selected:"", 
            options: ["Task 1", "Task 2"]

        },
        {   
            title:"View By:",
            selected:"", 
            options: ["Weekly", "Monthly", "Quarterly"]

        }
    ]}/></div>
    </div>
    );    
}

// Provide type to describe the GreetingBanner component's props
type StudentProps = {
    /** The name to display inside the banner */
    name: string;
}

// Greeting Banner component 
export function GreetingBanner({name}: StudentProps){

    return(
        <div className="greeting-banner">Hi, {name}</div>
    );
};


// Describe STATS data types 
type Stat = {
    label: string;
    value: number;
    icon: React.ReactNode;
}

type StatSummaryProps = {
    stats: Stat[];
}

// StatsSummary component displays four StatCard subcomponents which contain four key statistics from the student's submissions.
// TODO: Pass data for values to prop. 
function StatsSummary({stats}:StatSummaryProps){
    return(
        <div className="stats-summary">
            {stats.map((stat) => (
                <StatCard 
                key={stat.label}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                />
            ))}
    </div>
    );

}

// Provide type to describe the StatCard component's props
type StatCardProps = Stat;


// StatCard component displays a single stat card containing a label and value
function StatCard({label, value, icon}: StatCardProps){
    return (
        <div className="stat-card">
            <div className="stat-content">
            <p className="statcard-label">{label}</p>
            <p className="statcard-value">{value}</p>
            </div>
            <div className="stat-icon">{icon}</div>
        </div>
    );
}

// ProgressTracking component is a container for several smaller components that are dependant on the same data.
//function ProgressTracking({}){
    //return();
//}

// 
type FilterData = {
    title: string;  // ex. "Choose an IELTS Type"
    selected: string;  // ex. 'General/Task 1/Weekly'
    options: string[];
};

type FilterBarProps = {
    filters: FilterData[];
}
function FilterBar({filters}:FilterBarProps){
    return(
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

function ChartFilter({title, selected, options}:ChartFilterProps){
    return(
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

//function CriterionSelector({}:CriterionToggle){
    //return();
//}

//function CriterionToggle({}){
    //return();
//}

//function ProgressTrackingChart({}){
   // return();
//}

const STUDENT = "George";
;

const STATS = [
  { label: "Total Submissions", value: 15, icon:<IoDocumentsOutline />},
  { label: "Highest Score", value: 33, icon: <BsArrowUp />},
  { label: "Lowest Score", value: 0, icon: <BsArrowDown />},
  { label: "Average Score", value: 0, icon: <BsArrowDownUp />}
];

