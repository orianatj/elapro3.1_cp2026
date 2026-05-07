import React from "react";

export default function AssignmentPanel() {
  return (
    <div className="assignment-panel">
      <h3>View Assignment</h3>
      <p>
        <strong>Assignment:</strong> IELTS Practice Test 2
      </p>

      <div className="dummy-text"></div>

      <div className="resources">
        <div className="resource">
          <span>Reading Passage PDF</span>
          <button>View</button>
        </div>

        <div className="resource">
          <span>Listening MP3</span>
          <button>Play</button>
        </div>
      </div>
    </div>
  );
}