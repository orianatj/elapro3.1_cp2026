import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import './ProgressTracking.css';
import { EmptyState } from '../common/EmptyState';
import { useStudentProgressTracking } from '../hooks/useStudentProgressTracking';

// ProgressTracking component is a container for several smaller components that are dependant on the same data.
//function ProgressTracking({}){
//return();
//}

function ProgressTrackingChart({ }) {
    return (
        <div className="chart-card">
            {/*<ResponsiveContainer>
               <LineChart data={data}>
                    <CartesianGrid />
                    <Line datakey="" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 9]} type="number" />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>*/}
        </div>

    );
};


