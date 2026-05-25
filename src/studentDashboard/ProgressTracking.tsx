import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import './ProgressTracking.css';
import type { User } from '../types/common/User';
import { EmptyState } from '../common/EmptyState';
import { useStudentProgressChart } from '../hooks/useStudentProgressChart';
import type { IeltsType, AggregatedChartPoint, TaskType, CriterionKey, CriterionToggleConfig } from '../types/common/Dashboard';
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

    // Chart criterion toggles
    <div><CriterionSelector toggles={criterionToggleConfig} isVisible={isVisible} onToggle={handleToggle} /></div>

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

    if (chartData?.shouldRender === false) {
        return (

            <div><EmptyState title='Complete More Submissions to View Progress Trends' message={chartData?.message} /></div>
        )
    };

    if (!chartData) {
        return (
            <EmptyState title='Complete some Submissions to View Progress Trends' message="It looks like you haven't completed any submissions yet." />
        )
    }

    return (
        <ProgressTrackingChart chartData={chartData.chartData} isVisible={isVisible} toggleObjects={criterionToggleConfig} />
    )
};

type ProgressChartProps = {
    chartData: AggregatedChartPoint[];
    isVisible: Record<CriterionKey, boolean>;
    toggleObjects: CriterionToggleConfig[];
};


export function ProgressTrackingChart({ chartData, isVisible, toggleObjects }: ProgressChartProps) {
    return (
        <div className="chart-card">
            {<ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid />
                    <XAxis dataKey="dateLabel" />
                    <YAxis domain={[0, 9]} type="number" />
                    <Legend />

                    {toggleObjects.map((toggle) => (
                        <Line dataKey={toggle.key} name={toggle.label} hide={!isVisible[toggle.key]}
                        />

                    ))}
                </LineChart>
            </ResponsiveContainer>
            }
        </div>

    );
};


