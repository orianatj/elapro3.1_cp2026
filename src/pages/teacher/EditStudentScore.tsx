import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./editScore.css";
import "./teacher.css";
import ScoreBox from "../../common/ScoreBox";
import OverallScore from "../../common/OverallScore";
import AssignmentPanel from "../../common/AssignmentPanel";
import { useSubmissionResult } from "../../hooks/useSubmissionResult";

interface EditStudentScoreLocationState {
  submissionId?: string;
}

export function GetCompetencyScore({ submissionId }: { submissionId: string }, competencyname: string) {
  const submissionResultQuery = useSubmissionResult(submissionId);
  const responsePayload = submissionResultQuery.data;
  const result = responsePayload?.results?.[0] ?? responsePayload?.data?.results?.[0];
  const competencyName = competencyname;
  const competency = result?.competencies.find((c: any) => c.competency === competencyName)  ?? { score: "N/A" };

  if (submissionResultQuery.isLoading) return <div>Loading...</div>;
  if (submissionResultQuery.isError) return <div>Error: {String(submissionResultQuery.error)}</div>;

  return (competency.score);
}

export default function EditStudentScore() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as EditStudentScoreLocationState | null;
  const submissionId = state?.submissionId;
  var [taskResponse, setTaskResponse] = useState<number>(GetCompetencyScore({ submissionId: submissionId ?? "default-submission-id" }, "task_response") || 5.0);
  var [coherence, setCoherence] = useState<number>(GetCompetencyScore({ submissionId: submissionId ?? "default-submission-id" }, "coherence_cohesion") || 6.5);
  var [lexicalResource, setLexicalResource] = useState<number>(GetCompetencyScore({ submissionId: submissionId ?? "default-submission-id" }, "lexical") || 7.5);
  var [grammar, setGrammar] = useState<number>(GetCompetencyScore({ submissionId: submissionId ?? "default-submission-id" }, "grammar") || 4.0);

  
  var overallScore =
    (taskResponse + coherence + lexicalResource + grammar) / 4;

  const handleSave = () => {
    navigate("/teacher/individual-submission", { state: { submissionId } });
  }; 

    const handleCancel = () => {
    navigate("/teacher/individual-submission", { state: { submissionId } });
  }; 

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
        <button className="cancel" onClick={handleCancel}>Cancel</button>
        <button className="save" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}