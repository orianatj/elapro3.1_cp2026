// Build a static version of the student dashboard page using React components 
// Use top-down approach: start by building the components at the top of the hierarchy first 
// Type defines the structure of a summary score card 



export default function StudentDashboard(){
    return(
    <><GreetingBanner name={"Lucy"} /><StatsSummary /></>

    );    
}

// Provide type to describe the GreetingBanner component's props
interface StudentProps {
    /** The name to display inside the banner */
    name: string;
}

// Greeting Banner component 
function GreetingBanner({name}: StudentProps){
    return(
        <div>Hi,{name}</div>
    );
};




// StatsSummary component displays four StatCard subcomponents which contain four key statistics from the student's submissions 
function StatsSummary(){
    return(
        <div>
        <StatCard cardLabel="Total Submissions" value={0} /> 
        <StatCard cardLabel="Highest Score" value={0} />
        <StatCard cardLabel="Lowest Score" value={0} />
        <StatCard cardLabel="Average Score" value={0} />
    </div>
    );

}

interface StatCardProps {
    cardLabel: string;  //'Total Submissions', 'Highest Score', etc.
    value: number;  // Coressponding statistic 
};


function StatCard({cardLabel, value}: StatCardProps){
    return (
        <div>
            <p>{cardLabel}</p>
            <strong>{value}</strong>
        </div>
    );
}


function ProgressTracking({}){
    return();
}

function FilterBar({}:ChartFilter){
    return();
}

function ChartFilter({}){
    return();
}

function CriterionSelector({}:CriterionToggle){
    return();
}

function CriterionToggle({}){
    return();
}

function ProgressTrackingChart({}){
    return();
}

const STUDENTS = [
    {id:1, name:"Ben"},
    {id:2, name:"Lucy"},
    {id:3, name:"Tom"}
];

const AGG_SUBMISSIONS = [
    {}
];