import React, { useState } from "react";
import "./editScore.css";
import "./teacher.css";
import ScoreBox from "../../common/ScoreBox";
import OverallScore from "../../common/OverallScore";
import AssignmentPanel from "../../common/AssignmentPanel";

export default function EditStudentScore() {
  const [taskResponse, setTaskResponse] = useState<number>(8.0);
  const [coherence, setCoherence] = useState<number>(6.5);
  const [lexicalResource, setLexicalResource] = useState<number>(7.5);
  const [grammar, setGrammar] = useState<number>(4.0);

  const overallScore =
    (taskResponse + coherence + lexicalResource + grammar) / 4;

  return (
    <div className="edit-score-page">
      <h2 className="page-title">Edit Student Score</h2>

      <div className="student-card">
        <div className="student-avatar"></div>

        <div>
          <h3>Emily Parker</h3>
          <p>ID: 173657</p>
          <p>Class: Advanced English</p>
        </div>
      </div>

      <div className="score-grid">
        <ScoreBox
          title="Task Response"
          score={taskResponse}
          onScoreChange={setTaskResponse}
        />

        <ScoreBox
          title="Coherence & Cohesion"
          score={coherence}
          onScoreChange={setCoherence}
        />

        <ScoreBox
          title="Lexical Resource"
          score={lexicalResource}
          onScoreChange={setLexicalResource}
        />

        <ScoreBox
          title="Grammatical Range + Accuracy"
          score={grammar}
          onScoreChange={setGrammar}
        />
      </div>

      <AssignmentPanel />

      <OverallScore score={overallScore} />
      <div className="actions">
  <button className="cancel">Cancel</button>
  <button className="save">Save</button>
</div>
    </div>
  );
}