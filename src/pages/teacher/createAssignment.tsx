import React, { useState } from "react";
import "./createAssignment.css";
import { useQuestion } from "../../hooks/useQuestions";

type IELTSType = "Academic" | "General";
type TaskType = "Task 1" | "Task 2";

export default function CreateAssignment() {
  const { mutate, isPending } = useQuestion();

  const [ieltsType, setIeltsType] = useState<IELTSType>("Academic");
  const [assignType, setAssignType] = useState<"all" | "specific">("all");

  const [taskType, setTaskType] = useState<TaskType>("Task 1");
  const [questionText, setQuestionText] = useState("");

  const [settings, setSettings] = useState({
    timerEnabled: true,
    allowMultiple: false,
    shuffleQuestions: false,
    showAnswers: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      ieltsType,
      taskType,
      questionText,
    });
  };

  return (
    <form className="create-assignment-page" onSubmit={handleSubmit}>
      <div className="assignment-header">
        <div>
          <h1>Create Assignment</h1>
          <p className="breadcrumb">Assignments &gt; Create New</p>
        </div>

        <button type="button" className="back-btn">
          ← Back to Assignments
        </button>
      </div>

      <div className="assignment-layout">
        <div className="assignment-main-card">
          <h2>Overall Performance</h2>

          <div className="form-group">
            <label>
              Assignment Title <span className="required-star">*</span>
            </label>
            <input type="text" placeholder="Overall Performance" />
          </div>

          <div className="form-group">
            <label>
              Choose IELTS Type <span className="required-star">*</span>
            </label>

            <div className="radio-row">
              <label className="custom-control">
                <input
                  type="radio"
                  name="ieltsType"
                  checked={ieltsType === "Academic"}
                  onChange={() => setIeltsType("Academic")}
                />
                <span className="control-ui" />
                Academic
              </label>

              <label className="custom-control">
                <input
                  type="radio"
                  name="ieltsType"
                  checked={ieltsType === "General"}
                  onChange={() => setIeltsType("General")}
                />
                <span className="control-ui" />
                General
              </label>
            </div>
          </div>

          <div className="double-grid">
            <div className="form-group">
              <label>Task Number</label>
              <select
                value={taskType}
                onChange={(e) => setTaskType(e.target.value as TaskType)}
              >
                <option value="Task 1">Task 1</option>
                <option value="Task 2">Task 2</option>
              </select>
            </div>

            <div className="form-group">
              <label>Difficulty Level</label>
              <select>
                <option>Select Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>
              Description / Instructions <span className="required-star">*</span>
            </label>
            <textarea
              rows={7}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter instructions for students"
            />
          </div>

          <div className="double-grid">
            <div className="form-group">
              <label>
                Due Date <span className="required-star">*</span>
              </label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>
                Due Time <span className="required-star">*</span>
              </label>

              <div className="time-input-container">
                <input type="time" />
                <img
                  src="/src/assets/time-line.png"
                  alt="clock"
                  className="inside-icon"
                />
              </div>
            </div>
          </div>

          <div className="assignment-actions">
            <button type="button" className="cancel-btn">
              Cancel
            </button>

            <button type="submit" className="create-btn" disabled={isPending}>
              <img src="/src/assets/send-plane-fill.png" alt="send" />
              {isPending ? "Creating..." : "Create Assignment"}
            </button>
          </div>
        </div>

        <div className="assignment-sidebar">
          <div className="side-card">
            <h3>Upload Resources</h3>

            <div className="upload-box">
              <div className="upload-inner">
                <img
                  src="/src/assets/cloud-upload.png"
                  alt="upload"
                  className="upload-cloud-icon"
                />
                <p>Drag & drop files here</p>
                <span>or</span>
                <button type="button" className="browse-btn">
                  Browse Files
                </button>
              </div>
            </div>

            <div className="resource-list">
              <p>
                <img src="/src/assets/document-text.png" alt="document" />
                No resources uploaded yet
              </p>
            </div>
          </div>

          <div className="side-card">
            <h3>Assign To</h3>
            <p className="sub-text">
              Select classes or students for this assignment
            </p>

            <div className="assign-options">
              <label className="custom-control">
                <input
                  type="radio"
                  name="assignType"
                  checked={assignType === "all"}
                  onChange={() => setAssignType("all")}
                />
                <span className="control-ui" />
                All Classes
              </label>

              <label className="custom-control">
                <input
                  type="radio"
                  name="assignType"
                  checked={assignType === "specific"}
                  onChange={() => setAssignType("specific")}
                />
                <span className="control-ui" />
                Selected Specific Classes / Students
              </label>
            </div>
          </div>

          <div className="side-card">
            <h3>Additional Settings</h3>

            <div className="settings-options">
              <div className="timer-inline">
                <label className="custom-control">
                  <input
                    type="checkbox"
                    checked={settings.timerEnabled}
                    onChange={() => toggleSetting("timerEnabled")}
                  />
                  <span className="control-ui" />
                  Enable Timer
                </label>

                <div className="timer-row">
                  <input type="number" defaultValue={120} />
                  <span>minutes</span>
                </div>
              </div>

              <label className="custom-control">
                <input
                  type="checkbox"
                  checked={settings.allowMultiple}
                  onChange={() => toggleSetting("allowMultiple")}
                />
                <span className="control-ui" />
                Allow Multiple Submissions
              </label>

              <label className="custom-control">
                <input
                  type="checkbox"
                  checked={settings.shuffleQuestions}
                  onChange={() => toggleSetting("shuffleQuestions")}
                />
                <span className="control-ui" />
                Shuffle Questions
              </label>

              <label className="custom-control">
                <input
                  type="checkbox"
                  checked={settings.showAnswers}
                  onChange={() => toggleSetting("showAnswers")}
                />
                <span className="control-ui" />
                Show Answers After Submission
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}