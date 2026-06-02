import type { StatCard } from "../types/student/StudentDashboard";

// Define props for StatsSummary component
type StatSummaryProps = {
    stats: StatCard[];
};

// StatsSummary component displays StatCard subcomponents which contain key statistics from the student's submissions.
export function StatsSummary({ stats }: StatSummaryProps) {
    return (
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


// Define props for StatCard component
type StatCardProps = StatCard;


// StatCard component displays a single stat card containing a label and value
function StatCard({ label, value, icon: Icon }: StatCardProps) {
    return (
        <div className="stat-card">
            <div className="stat-content">
                <p className="statcard-label">{label}</p>
                <p className="statcard-value">{value}</p>
            </div>
            <div className="stat-icon">
                <Icon />
            </div>
        </div>
    );
}