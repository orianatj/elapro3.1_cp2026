// Shared components
import { StudentHeaderBar } from "../../common/StudentHeaderBar";
import { PracticeTaskSelectionGroup } from "../../studentDashboard/PracticeWritingTaskSelection";
import { TaskUtilityBar } from "../../studentDashboard/PracticeWritingTaskUtilityBar";

// Types (ViewData)
import type { PracticeWriting } from "../../types/student/StudentPracticeWriting";

import "./practicewriting.css";


type PracticeWritingPageProps = {
    viewData: PracticeWriting;
};

export default function PracticeWritingPage({ viewData }: PracticeWritingPageProps) {

    return (

        <div className="practice-writing-page">

            {/* Page Header */}
            <StudentHeaderBar header={viewData.pageHeader} />

            {/* Task Utility Bar */}
            <div className="task-utility-bar">
                <TaskUtilityBar utilData={viewData.taskBar} />                
            </div>

            {/* Main content layout */}
            <div className="practice-page-content-layout">

                {/* Task Section */}
                <div className="practice-writing-task">

                    <div className="task-selection-section">

                        {/* Dropdown Selection Group 
                        (includes section-header and action button) */}
                        <div className="task-dropdown-selection">
                            <PracticeTaskSelectionGroup
                                ieltsFilter={viewData.ieltsSelection}
                                taskFilter={viewData.taskSelection}
                            />
                        </div>

                    </div>

                    {/* Task Description Section*/}
                    <div className="task-description-section">

                        {/* Section Header */}
                        <div className="section-header">
                            {/*TODO: "Implement SectionHeader"*/}
                        </div>

                        <div className="task-description">
                            {/*TODO: "Implement TaskDescription"*/}
                        </div>
                    </div>
                </div>


                {/* Answer Section */}
                <div className="practice-writing-answer">

                    {/* Section Header */}
                    <div className="section-header">
                        {/*TODO: "Implement SectionHeader"*/}
                    </div>

                    <div className="answer-text-editor">
                        {/*TODO: "Implement AnswerEditor"*/}
                    </div>

                    {/* Submit Answer Button */}
                    <div className="submit-answer-button">
                        {/*TODO: "Implement SubmitAnswerButton"*/}
                    </div>
                </div>
            </div>
        </div>
    )
};