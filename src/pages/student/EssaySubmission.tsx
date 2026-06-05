// Import shared components
import { StudentHeaderBar } from "../../common/StudentHeaderBar";
import { PracticeTaskSelectionGroup as TaskSelectionGroup} from "../../studentDashboard/PracticeWritingTaskSelection";
import { TaskUtilityBar } from "../../studentDashboard/PracticeWritingTaskUtilityBar";
import { AnswerEditor } from "../../studentDashboard/PracticeWritingAnswerEditor";

// Import hooks
import { useEssaySubmission } from "../../hooks/useEssaySubmission";

export default function EssaySubmissionPage() {
    const { viewData, actions, state } = useEssaySubmission();

    return (
        <div className="essay-submission-page">

            {/* Page Header */}
            <StudentHeaderBar header={viewData.pageHeader} />

            {/* Task Utility Bar */}
            <TaskUtilityBar utilData={viewData.taskBar} />

            {/* Main Content */}
            <div className="main-content">

                {/* Task Section */}
                <div className="task-section">

                    {/* Generate / Select Task */}
                    <TaskSelectionGroup
                        ieltsFilter={viewData.ieltsSelection}
                        taskFilter={viewData.taskSelection}
                        onIeltsTypeChange={actions.setIeltsType}
                        onTaskTypeChange={actions.setTaskType}
                        onGenerate={actions.generateQuestion}
                    />

                    {/* Upload Section */}
                    <div className="upload-section">
                        <button>Upload Question</button>
                        <button>Upload Essay</button>
                    </div>

                    {/* Task Description */}
                    <div className="task-description">
                        <h4>Task Description</h4>
                        <p>
                            {viewData.taskDescription.questionText ||
                                viewData.taskDescription.placeHolderText}
                        </p>
                    </div>

                </div>

                {/* Answer Section */}
                <div className="answer-section">
                    <h4>Your Answer</h4>

                    <AnswerEditor
                        answer={viewData.answer}
                        onWordCountChange={actions.setWordCount}
                        onTextChange={actions.setAnswerText}
                    />
                </div>

                {/* Submit Section */}
                <div className="submit-section">
                    <button
                        onClick={() => actions.submitAnswer()}
                        disabled={state.isSubmittingAnswer}
                    >
                        {state.isSubmittingAnswer ? "Submitting..." : "Submit Answer"}
                    </button>

                    {state.submitAnswerErrorMessage && (
                        <p>{state.submitAnswerErrorMessage}</p>
                    )}

                    {!state.submitAnswerErrorMessage && state.submitSuccessMessage && (
                        <p>{state.submitSuccessMessage}</p>
                    )}
                </div>

            </div>
        </div>
    );
}

