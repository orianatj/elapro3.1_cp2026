import React from "react";
import "./editScore.css";
import "./teacher.css";

export default function EditStudentScore() {
  return (
    <div className="edit-score-page">
      <h2 className="page-title">Edit Student Score</h2>

      {/* Student Info */}
      <div className="student-card">
        <div className="student-avatar"></div>
        <div>
          <h3>Emily Parker</h3>
          <p>ID: 173657</p>
          <p>Class: Advanced English</p>
        </div>
      </div>

      {/* Score Grid */}
      <div className="score-grid">
        <ScoreBox title="Task Response" score="8.0" />
        <ScoreBox title="Coherence & Cohesion" score="6.5" />
        <ScoreBox title="Lexical Resource" score="7.5" />
        <ScoreBox title="Grammatical Range + Accuracy" score="4.0" />
      </div>

      {/* Right Panel */}
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

      {/* Overall Score */}
      {/* Overall Score */}
      <div className="overall-score">
        <div className="overall-score__header">Overall Score</div>

        <div className="overall-score__body">
          <div className="score-value">
            <span className="score-badge">7.0</span>
            <p className="level-text">Level: Good User</p>
          </div>
        </div>

        <div className="overall-score__footer">
          <p className="description">Description here</p>
        </div>
      </div>
    </div>
  );
}

/* Reusable Score Box */
function ScoreBox({ title, score }: { title: string; score: string }) {
  return (
    <div className="score-box">
      <h4>{title}</h4>
      <h2>{score}</h2>

      <div className="slider-wrapper">
        <div className="score-slider">
          <input type="range" />
        </div>
      </div>
    </div>
  );
}
