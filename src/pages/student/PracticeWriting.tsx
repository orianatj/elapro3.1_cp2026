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
import "./practicewriting.css";

export default function PracticeWritingPage() {

    const { viewData, actions, state } = usePracticeWriting();

    // derive word count
    const computedWordCount = getWordCount(viewData.answer.answerText);

    return (

        <div className="practice-writing-page">

            {/* Page Header */}
            <StudentHeaderBar header={viewData.pageHeader} />

            {/* Task Utility Bar */}
            <TaskUtilityBar utilData={{
                ...viewData.taskBar,
                userWordCount: computedWordCount
            }} />


            {/* Main content layout */}
            <div className="main-content">

                {/* Task Section */}
                <div className="left-column">

                    {/* Dropdown Selection Group */}
                    <div className="task-section">

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

                </div>

                {/* Task Description */}
                <div className="task-description">

                    <h4>Task Description</h4>

                    <p>
                        {viewData.taskDescription.questionText || viewData.taskDescription.placeHolderText}
                    </p>

                </div>

            </div>

            {/* Answer Section */}
            <div className="answer-section">

                <h4>Your Answer</h4>

                <AnswerEditor
                    answer={viewData.answer}
                    onTextChange={actions.setAnswerText}
                />


                {/* Submit */}
                <div className="submit-section">

                    <button
                        onClick={() => actions.submitAnswer()}
                        disabled={state.isSubmittingAnswer}
                    >
                        {state.isSubmittingAnswer ? "Submitting..." : "Submit Answer"}
                    </button>


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
    );
}
