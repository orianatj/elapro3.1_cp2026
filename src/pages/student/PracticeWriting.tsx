import { useState } from "react";

// Shared components
import { StudentHeaderBar } from "../../common/StudentHeaderBar";
import { PracticeTaskSelectionGroup } from "../../studentDashboard/PracticeWritingTaskSelection";
import { TaskUtilityBar } from "../../studentDashboard/PracticeWritingTaskUtilityBar";
import { AnswerEditor } from "../../studentDashboard/PracticeWritingAnswerEditor";

// Types (ViewData)
import type { PracticeWriting } from "../../types/student/StudentPracticeWriting";

// import "./practicewriting.css";


type PracticeWritingPageProps = {
    viewData: PracticeWriting;
};

export default function PracticeWritingPage({ viewData }: PracticeWritingPageProps) {

    const [wordCount, setWordCount] = useState(viewData.answer.wordCount);

    return (

        <div className="practice-writing-page">

            {/* Page Header */}
            <StudentHeaderBar header={viewData.pageHeader} />

            {/* Task Utility Bar */}
            <div className="task-utility-bar">
                <TaskUtilityBar utilData={{
                    ...viewData.taskBar,
                    userWordCount: wordCount
                }} />
            </div>

            {/* Main content layout */}
            <div className="practice-page-content-layout">

                {/* Task Section */}
                <div className="practice-writing-task">

                    {/* Dropdown Selection Group 
                        (includes section-header and action button) */}
                    <div className="task-selection-section">

                        <PracticeTaskSelectionGroup
                            ieltsFilter={viewData.ieltsSelection}
                            taskFilter={viewData.taskSelection}
                        />

                    </div>

                    {/* Task Description Section*/}
                    <div className="task-description-section">

                        {/* Section Header */}
                        <div className="section-header">
                            <h4>Task Description</h4>
                        </div>

                        <div className="task-description">
                            {viewData.taskDescription.questionText || viewData.taskDescription.placeHolderText}
                        </div>
                    </div>
                </div>


                {/* Answer Section */}
                <div className="practice-writing-answer">

                    {/* Section Header */}
                    <div className="section-header">
                        <h4>Your Answer</h4>
                    </div>

                    <div className="answer-text-editor">
                        <AnswerEditor
                            answer={viewData.answer}
                            onWordCountChange={setWordCount}
                        />
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