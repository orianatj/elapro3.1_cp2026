// StudentDashboardPage.tsx
import "../../pages/student/studentdb.css";

// Build a static version of the student dashboard page using React components 
// Use top-down approach: start by building the components at the top of the hierarchy first 
// Type defines the structure of a summary score card 



export default function StudentDashboard(){
    return(
    <div className="container">
    <div><GreetingBanner name={STUDENT}/></div>
    <div><StatsSummary stats={STATS}/></div>
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




// StatsSummary component displays four StatCard subcomponents which contain four key statistics from the student's submissions.
// TODO: Pass data for values to prop. 
function StatsSummary({stats}:StatSummaryProps){
    return(
        <div className="stats-summary">
            {stats.map((stat) => (
                <StatCard 
                cardLabel={stat.label}
                value={stat.value}
                />
            ))}
    </div>
    );

}

// Describe STATS data types 
type Stat = {
    label: string;
    value: number;
}

type StatSummaryProps = {
    stats: Stat[];
}


// Provide type to describe the StatCard component's props
type StatCardProps = {
    cardLabel: string;  //'Total Submissions', 'Highest Score', etc.
    value: number;  // Coressponding statistic 
};



// StatCard component displays a single stat card containing a label and value
function StatCard({cardLabel, value}: StatCardProps){
    return (
        <div className="stat-card">
            <p className="statcard-label">{cardLabel}</p>
            <p className="statcard-value">{value}</p>
        </div>
    );
}

// ProgressTracking component is a container for several smaller components that are dependant on the same data.
//function ProgressTracking({}){
    //return();
//}

//function FilterBar({}:ChartFilter){
//    return();
//}


// 
interface ChartFilterProps {
    title: string;  // ex. "Choose an IELTS Type"
    selected: string;  // ex. true
    options: string[];
};

function ChartFilter({title, selected, options}:ChartFilterProps){
    return(
    <>
        <label>{title}</label>
        <select value={selected}>
            <option>--Please choose a X--</option>
            {options.map((option) => (
                <option value={option}>
                    {option}
                </option>
            ))}
        </select>
    </>
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
  { label: "Total Submissions", value: 15 },
  { label: "Highest Score", value: 33 },
  { label: "Lowest Score", value: 0 },
  { label: "Average Score", value: 0 }
];

