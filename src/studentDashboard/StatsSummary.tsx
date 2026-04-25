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
export function StatsSummary({stats}:StatSummaryProps){
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