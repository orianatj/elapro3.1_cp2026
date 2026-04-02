// Type defines the four key statistics presented to the student at the top of the dashboard page

interface SummaryStats {
    totalSubmissions: number;
    highestScore: number;
    lowestScore: number;
    averageScore: number;
};

// Type defines the structure of a summary score card 
interface SummaryCard {
    cardLabel: string;  //'Total Submissions', 'Highest Score', etc.
    // Any of the properties listed in SummaryStats
    value: number;
};


function UserStatCard({cardLabel, value}: SummaryCard){
    return (
        <div>
            <p>{cardLabel}</p>
            <strong>{value}</strong>
        </div>
    );
}

export default function UserStatsSummary() {
    return (
    <div>
        <UserStatCard cardLabel="Total Submissions" value={0} /> 
        <UserStatCard cardLabel="Highest Score" value={0} />
        <UserStatCard cardLabel="Lowest Score" value={0} />
        <UserStatCard cardLabel="Average Score" value={0} />
    </div>
        

    );
}

const STUDENT = [
    {},
    {},
    {}
];