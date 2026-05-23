import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./editScore.css";
import "./teacher.css";
import ScoreBox from "../../common/ScoreBox";
import OverallScore from "../../common/OverallScore";
import AssignmentPanel from "../../common/AssignmentPanel";
import { useSubmissionResult } from "../../hooks/useSubmissionResult";

interface EditStudentScoreLocationState {
  submissionId?: string;
}

export function GetTaskResponseScore({ submissionId }: { submissionId: string }) {
  const submissionResultQuery = useSubmissionResult(submissionId);
  const responsePayload = submissionResultQuery.data;
  const result = responsePayload?.results?.[0] ?? responsePayload?.data?.results?.[0];

  if (submissionResultQuery.isLoading) return <div>Loading...</div>;
  if (submissionResultQuery.isError) return <div>Error: {String(submissionResultQuery.error)}</div>;

  return (
    result?.competencies?.[0]?.score
  );
}

export function GetCoherenceScore({ submissionId }: { submissionId: string }) {
  const submissionResultQuery = useSubmissionResult(submissionId);
  const responsePayload = submissionResultQuery.data;
  const result = responsePayload?.results?.[0] ?? responsePayload?.data?.results?.[0];

  if (submissionResultQuery.isLoading) return <div>Loading...</div>;
  if (submissionResultQuery.isError) return <div>Error: {String(submissionResultQuery.error)}</div>;

  return (
    result?.competencies?.[1]?.score
  );
}

export function GetLexicalResourceScore({ submissionId }: { submissionId: string }) {
  const submissionResultQuery = useSubmissionResult(submissionId);
  const responsePayload = submissionResultQuery.data;
  const result = responsePayload?.results?.[0] ?? responsePayload?.data?.results?.[0];

  if (submissionResultQuery.isLoading) return <div>Loading...</div>;
  if (submissionResultQuery.isError) return <div>Error: {String(submissionResultQuery.error)}</div>;

  return (
    result?.competencies?.[2]?.score
  );
}

export function GetGrammarScore({ submissionId }: { submissionId: string }) {
  const submissionResultQuery = useSubmissionResult(submissionId);
  const responsePayload = submissionResultQuery.data;
  const result = responsePayload?.results?.[0] ?? responsePayload?.data?.results?.[0];

  if (submissionResultQuery.isLoading) return <div>Loading...</div>;
  if (submissionResultQuery.isError) return <div>Error: {String(submissionResultQuery.error)}</div>;

  return (
    result?.competencies?.[3]?.score
  );
}

export default function EditStudentScore() {
  const location = useLocation();
  const state = location.state as EditStudentScoreLocationState | null;
  const submissionId = state?.submissionId;
  const [taskResponse, setTaskResponse] = useState<number>(GetTaskResponseScore({ submissionId: submissionId ?? "default-submission-id" }) || 5.0);
  const [coherence, setCoherence] = useState<number>(GetCoherenceScore({ submissionId: submissionId ?? "default-submission-id" }) || 6.5);
  const [lexicalResource, setLexicalResource] = useState<number>(GetLexicalResourceScore({ submissionId: submissionId ?? "default-submission-id" }) || 7.5);
  const [grammar, setGrammar] = useState<number>(GetGrammarScore({ submissionId: submissionId ?? "default-submission-id" }) || 4.0);

  
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