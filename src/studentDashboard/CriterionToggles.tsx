import './ProgressTracking.css';
import type { CriterionKey, CriterionToggleConfig } from '../types/common/StudentDashboard';


// Define props for CriterionSelector component
type CriterionSelectorProps = {
    toggles: CriterionToggleConfig[];
    isVisible: Record<CriterionKey, boolean>;
    onToggle: (key: CriterionKey) => void;
};


/* CriterionSelector maps criterion toggle configuration objects to
interactive CriterionToggle components. Toggle visibility state and
event handlers are controlled by the parent ProgressTracking component
and passed down as props.
*/
export function CriterionSelector({ toggles, isVisible, onToggle }: CriterionSelectorProps) {

    return (
        <div className='toggle-box'>
            {toggles.map((toggle) => (
                <CriterionToggle
                    key={toggle.key}
                    label={toggle.label}
                    isOn={isVisible[toggle.key]}
                    onToggle={() => onToggle(toggle.key)}
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
