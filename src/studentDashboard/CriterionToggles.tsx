import './ProgressTracking.css';
import { useState } from "react";


// Define props for CriterionSelector component
type CriterionSelectorProps = {
    toggles: string[];
};


/* Component takes a list of crtierion labels and maps them to a toggle. Custom event handler 'handleToggle' adds interactivity to the toggle components. This comonent is the parent component of CriterionToggle.
*/
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


// Define the data structure provided as props
type CriterionToggleData = {
    isOn: boolean;
    onToggle: () => void;
    label: string;
};


// Define props for CriterionToggle component
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
