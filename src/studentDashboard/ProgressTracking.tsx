import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import './ProgressTracking.css';
import { useState } from "react";


// ProgressTracking component is a container for several smaller components that are dependant on the same data.
//function ProgressTracking({}){
//return();
//}

type CriterionSelectorProps = {
    toggles: string[];
};



export function CriterionSelector({ toggles }: CriterionSelectorProps) {

    const [selected, setSelected] = useState(toggles.map(() => true));

    const handleToggle = (index: number) => {
        setSelected((prev) =>
            prev.map((value, i) =>
                i === index ? !value : value

            )
        );
    };

    return (
        <div className='toggle-box'>
            <h3>Select Criterion</h3>
            {toggles.map((toggle, index) => (
                <CriterionToggle
                    key={toggle}
                    label={toggle}
                    isOn={selected[index]}
                    onToggle={() => handleToggle(index)}
                />
            ))}
        </div>
    );
};

type CriterionToggleData = {
    isOn: boolean;
    onToggle: () => void;
    label: string;
};

type CriterionToggleProps = CriterionToggleData;

// Individual toggle component for use in CriterionSelector 
function CriterionToggle({ isOn, onToggle, label }: CriterionToggleProps) {
    return (
        <label className="switch">
            <input className="toggle-checkbox" type="checkbox" checked={isOn} onChange={onToggle} />
            <span className="slider"></span>
            <span className="toggle-label">{label}</span>
        </label>
    );
};



// 
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


