import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import type { User } from '../types/common/User';
import { EmptyState } from '../common/EmptyState';
import { useStudentProgressChart } from '../hooks/useStudentProgressChart';
import type { IeltsType, AggregatedChartPoint, TaskType, CriterionKey, CriterionToggleConfig } from '../types/student/StudentDashboard';
import { useState } from "react";
import axios from "axios";
import { CriterionSelector } from './CriterionToggles';
import { criterionToggleConfig } from '../constants/studentProgressChartConfig';


// ProgressTracking component is a container for several smaller components that are dependant on the same data.

type ProgressTrackingProps = {
    userId: User["userId"];
    ieltsType?: IeltsType;
    taskType?: TaskType;
};


export function ProgressTracking({ userId, ieltsType, taskType }: ProgressTrackingProps) {

    const [isVisible, setIsVisible] = useState<Record<CriterionKey, boolean>>({

        meanOverallScore: true,
        meanTaskResponse: true,
        meanCoherenceCohesion: true,
        meanLexicalResource: true,
        meanGrammaticalRangeAccuracy: true
    });

    function handleToggle(key: CriterionKey) {
        setIsVisible((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    }

    const progressChartQuery = useStudentProgressChart({ userId, ieltsType, taskType });

    const chartData = progressChartQuery.data;



    if (progressChartQuery.isLoading) {

        return (
            <div>Loading chart...</div>
        )
    };

    if (axios.isAxiosError(progressChartQuery.error)) {

        const status = progressChartQuery.error.response?.status;

        if (status === 422) {
            return (
                <p className="auth-error">Invalid data provided. Please try again.</p>
            )
        }

        if (status === 500) {
            return (
                <p className="auth-error">Unable to load progress data.</p>
            )
        }
    };



    if (!chartData) {
        return null;
    }

    if (chartData.chartMode === "empty") {
        return (
            <EmptyState title='Complete some Submissions to View Progress Trends' message={chartData.message} />
        );
    }

    const renderableChartData = chartData.chartData;



    if (!renderableChartData) {

        return null;
    };

    return (

        // Chart criterion toggles
        <div className="progress-tracking-container">


            <div className="criterion-selector-container">

                <div className="criterion-selector-row">
                    <p className="criterion-title">Criterion selectors:</p>

                    <CriterionSelector toggles={criterionToggleConfig} isVisible={isVisible} onToggle={handleToggle} />
                </div>



            </div>

            <ProgressTrackingChart chartData={renderableChartData} isVisible={isVisible} toggleObjects={criterionToggleConfig} />

        </div>
    )
};

// Define type for ProgressTrackingChart props
type ProgressChartProps = {
    chartData: AggregatedChartPoint[];
    isVisible: Record<CriterionKey, boolean>;
    toggleObjects: CriterionToggleConfig[];
};


export function ProgressTrackingChart({ chartData, isVisible, toggleObjects }: ProgressChartProps) {
    return (
        <div className="chart-card">

            <div className="chart-header">

                <h2 className="chart-title">IELTS Progress Tracking</h2>

            </div>
            {<ResponsiveContainer width="100%" height={500}>
                <LineChart data={chartData} accessibilityLayer={true} margin={{ top: 10, right: 5, bottom: 5, left: 5 }}>
                    <CartesianGrid strokeDasharray={"5 5"} />
                    <XAxis dataKey="dateLabel" label="" />
                    <YAxis domain={[0, 9]} interval={0} ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} type="number" label={{ value: "IELTS Score", position: 'insideLeft', dx: 0, dy: 20, angle: -90 }} />
                    <Tooltip cursor={false} />
                    <Legend />

                    {toggleObjects.map((toggle) => (
                        <Line key={toggle.key} type="monotone" dataKey={toggle.key} name={toggle.label} stroke={toggle.color} hide={!isVisible[toggle.key]} dot={isVisible[toggle.key] ? { r: 6, fill: toggle.color, stroke: "#ffffff", strokeWidth: 2 } : false} activeDot={isVisible[toggle.key] ? { r: 8, fill: toggle.color } : false}
                        />

                    ))}
                </LineChart>
            </ResponsiveContainer>
            }
        </div >

    );
};


