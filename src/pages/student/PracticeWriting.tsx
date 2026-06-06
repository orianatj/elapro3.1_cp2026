// Shared components
import { StudentHeaderBar } from "../../common/StudentHeaderBar";
import { PracticeTaskSelectionGroup } from "../../studentDashboard/PracticeWritingTaskSelection";
import { TaskUtilityBar } from "../../studentDashboard/PracticeWritingTaskUtilityBar";
import { AnswerEditor } from "../../studentDashboard/PracticeWritingAnswerEditor";

// Hooks
import { usePracticeWriting } from "../../hooks/usePracticeWriting";

// Utils
import { getWordCount } from "../../utils/wordCounter";

//Styles
// import "./practicewriting.css";

export default function PracticeWritingPage() {

    const { viewData, actions, state } = usePracticeWriting();

    // derive word count
    const computedWordCount = getWordCount(viewData.answer.answerText);

    return (

        <div className="practice-writing-page">

            {/* Page Header */}
            <StudentHeaderBar header={viewData.pageHeader} />

            {/* Task Utility Bar */}
            <div className="task-utility-bar">
                <TaskUtilityBar utilData={{
                    ...viewData.taskBar,
                    userWordCount: computedWordCount
                }} />
            </div>

            {/* Main content layout */}
            <div className="practice-page-content-layout">

                {/* Task Section */}
                <div className="practice-writing-task">

                    {/* Dropdown Selection Group */}
                    <div className="task-selection-section">

                        <PracticeTaskSelectionGroup
                            ieltsFilter={viewData.ieltsSelection}
                            taskFilter={viewData.taskSelection}
                            onIeltsTypeChange={actions.setIeltsType}
                            onTaskTypeChange={actions.setTaskType}
                            onGenerate={actions.generateQuestion}
                        />

                        {state.generateQuestionErrorMessage && (
                            <div className="error">
                                {state.generateQuestionErrorMessage}
                            </div>
                        )}

                    </div>

                    {/* Task Description */}
                    <div className="task-description-section">

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

                    <div className="section-header">
                        <h4>Your Answer</h4>
                    </div>

                    <div className="answer-text-editor">
                        <AnswerEditor
                            answer={viewData.answer}
                            onTextChange={actions.setAnswerText}  
                        />
                    </div>

                    {/* Submit */}
                    <div className="submit-answer-section">

                        <div className="submit-answer-button">
                            <button
                                onClick={() => actions.submitAnswer()}
                                disabled={state.isSubmittingAnswer}
                            >
                                {state.isSubmittingAnswer ? "Submitting..." : "Submit Answer"}
                            </button>
                        </div>

                        {state.submitAnswerErrorMessage && (
                            <div className="error">
                                {state.submitAnswerErrorMessage}
                            </div>
                        )}

                        {!state.submitAnswerErrorMessage && state.submitSuccessMessage && (
                            <div className="success">
                                {state.submitSuccessMessage}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
