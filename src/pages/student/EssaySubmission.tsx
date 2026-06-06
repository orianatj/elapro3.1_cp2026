import { useLocation } from "react-router-dom"

// Import shared components
import { StudentHeaderBar } from "../../common/StudentHeaderBar";
import { PracticeTaskSelectionGroup as TaskSelectionGroup} from "../../studentDashboard/PracticeWritingTaskSelection";
import { TaskUtilityBar } from "../../studentDashboard/PracticeWritingTaskUtilityBar";
import { AnswerEditor } from "../../studentDashboard/PracticeWritingAnswerEditor";

// Import hooks
import { useEssaySubmission } from "../../hooks/useEssaySubmission";

// Import Types
import type { IeltsType, TaskType } from "../../types/student/common/StudentFilter";

// Import constants
import { ACCEPTED_FILE_TYPES } from "../../constants/uploadAcceptedFileTypes";

// Import utils
import { getWordCount } from "../../utils/wordCounter";

export default function EssaySubmissionPage() {

    // Router state from SubmissionAnalysis reattempt flow
    const location = useLocation();

    const reattempt = location.state?.reattempt as
        | {
            ieltsType: IeltsType;
            taskType: TaskType;
            questionId: string;
            questionText: string;
        }
        | undefined;

    // Hook
    const { viewData, actions, state } =
        useEssaySubmission(reattempt);

    // Derive live word count
    const computedWordCount =
        getWordCount(viewData.answer.answerText);


        return (
        <div className="essay-submission-page">

            {/* Page Header */}
            <StudentHeaderBar header={viewData.pageHeader} />

            {/* Task Utility Bar */}
            <TaskUtilityBar
                utilData={{
                    ...viewData.taskBar,
                    userWordCount: computedWordCount
                }}
            />

            {/* Main Content */}
            <div className="main-content">

                {/* Task Section */}
                <div className="task-section">

                    {/* Generate Question */}
                    <TaskSelectionGroup
                        ieltsFilter={viewData.ieltsSelection}
                        taskFilter={viewData.taskSelection}
                        onIeltsTypeChange={actions.setIeltsType}
                        onTaskTypeChange={actions.setTaskType}
                        onGenerate={actions.generateQuestion}
                    />

                    {/* Upload Section */}
                    <div className="upload-section">

                        {/* Hidden question upload input */}
                        <input
                            type="file"
                            id="question-upload"
                            accept={ACCEPTED_FILE_TYPES}
                            style={{ display: "none" }}
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                    actions.uploadQuestion(file);

                                    // allow same file to be uploaded again
                                    e.target.value = "";
                                }
                            }}
                        />

                        {/* Upload question trigger */}
                        <label
                            htmlFor="question-upload"
                            className="upload-button"
                        >
                            {state.isUploadingQuestion
                                ? "Uploading..."
                                : "Upload Question"}
                        </label>

                        {/* Hidden essay upload input */}
                        <input
                            type="file"
                            id="essay-upload"
                            accept={ACCEPTED_FILE_TYPES}
                            style={{ display: "none" }}
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                    actions.uploadEssay(file);

                                    // allow same file to be uploaded again
                                    e.target.value = "";
                                }
                            }}
                        />

                        {/* Upload essay trigger */}
                        <label
                            htmlFor="essay-upload"
                            className="upload-button"
                        >
                            {state.isUploadingEssay
                                ? "Uploading..."
                                : "Upload Essay"}
                        </label>

                    </div>

                    {/* Reset upload */}
                    <button
                        type="button"
                        onClick={actions.resetUpload}
                        disabled={
                            state.isUploadingEssay ||
                            state.isUploadingQuestion
                        }
                    >
                        Reset Upload
                    </button>

                    {/* Essay upload feedback */}
                    {state.isUploadingEssay && (
                        <p>Uploading essay...</p>
                    )}

                    {state.uploadEssayErrorMessage && (
                        <p>{state.uploadEssayErrorMessage}</p>
                    )}

                    {/* Question upload feedback */}
                    {state.isUploadingQuestion && (
                        <p>Uploading question...</p>
                    )}

                    {state.uploadQuestionErrorMessage && (
                        <p>{state.uploadQuestionErrorMessage}</p>
                    )}

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
                    onTextChange={actions.setAnswerText}
                />

            </div>

            {/* Submit Section */}
            <div className="submit-section">

                <button
                    onClick={() => actions.submitAnswer()}
                    disabled={state.isSubmittingAnswer}
                >
                    {state.isSubmittingAnswer
                        ? "Submitting..."
                        : "Submit Answer"}
                </button>

                {state.submitAnswerErrorMessage && (
                    <p>{state.submitAnswerErrorMessage}</p>
                )}

                {!state.submitAnswerErrorMessage &&
                    state.submitSuccessMessage && (
                        <p>{state.submitSuccessMessage}</p>
                    )}

            </div>

        </div>
    );
}