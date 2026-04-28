// StudentDashboardPage.tsx
import "../../pages/student/studentdb.css";
import { IoDocumentsOutline} from "react-icons/io5";
import { BsArrowUp, BsArrowDown, BsArrowDownUp } from "react-icons/bs";
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';


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
    <div></div>
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

function ProgressTrackingChart({}){
    return(
    <div className="chart-card">
        <ResponsiveContainer>
            <LineChart data={data}>
                <CartesianGrid />
                <Line datakey="" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 9]} type="number"/>
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    </div>

    );
}

//function CriterionSelector({}:CriterionToggle){
    //return();
//}

//function CriterionToggle({}){
    //return();
//}



const STUDENT = "George";
;

const STATS = [
  { label: "Total Submissions", value: 15, icon:<IoDocumentsOutline />},
  { label: "Highest Score", value: 33, icon: <BsArrowUp />},
  { label: "Lowest Score", value: 0, icon: <BsArrowDown />},
  { label: "Average Score", value: 0, icon: <BsArrowDownUp />}
];

const CHART_DATA = [
    {ielts: "general", task: "task one", week:"05/01", overallScore: 6, taskAchievement: 5.5, GrammaticalRA: 6, lexicalResource: 5, coheranceAndCohesion: 7},
    {ielts: "general", task: "task one", week:"19/01",  overallScore: 5, taskAchievement: 4, GrammaticalRA: 4, lexicalResource: 5, coheranceAndCohesion: 6},
    {ielts: "general", task: "task one", week:"26/01" ,overallScore: 5, taskAchievement: 4, GrammaticalRA: 4, lexicalResource: 5, coheranceAndCohesion: 6},

]