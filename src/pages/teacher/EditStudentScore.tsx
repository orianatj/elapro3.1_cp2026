import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./editscore.css";
import "./teacher.css";
import ScoreBox from "../../common/ScoreBox";
import OverallScore from "../../common/OverallScore";
import { useSubmissionResult } from "../../hooks/useSubmissionResult";
import { useReviewResult } from "../../hooks/useReviewResult";

export function GetCompetencyScore({ submissionId }: { submissionId: string }, competencyname: string) {
  const submissionResultQuery = useSubmissionResult(submissionId);
  const responsePayload = submissionResultQuery.data;
  const result = responsePayload?.results?.[0] ?? responsePayload?.data?.results?.[0];
  const competencyName = competencyname;
  const competency = result?.competencies.find((c: any) => c.competency === competencyName) ?? { score: "N/A" };

  if (submissionResultQuery.isLoading) return <div>Loading...</div>;
  if (submissionResultQuery.isError) return <div>Error: {String(submissionResultQuery.error)}</div>;

  return competency.score;
}

export function GetCompetencyFeedback({ submissionId }: { submissionId: string }, competencyname: string) {
  const submissionResultQuery = useSubmissionResult(submissionId);
  const responsePayload = submissionResultQuery.data;
  const result = responsePayload?.results?.[0] ?? responsePayload?.data?.results?.[0];
  const competencyName = competencyname;
  const competency = result?.competencies.find((c: any) => c.competency === competencyName) ?? { score: "N/A" };

  if (submissionResultQuery.isLoading) return <div>Loading...</div>;
  if (submissionResultQuery.isError) return <div>Error: {String(submissionResultQuery.error)}</div>;

  return competency.feedback;
}

export default function EditStudentScore() {
  const { submissionId, firstName, lastName } = useParams<{ submissionId: string; firstName?: string; lastName?: string }>();
  const firstNameDecoded = firstName ? decodeURIComponent(firstName) : "Emily";
  const lastNameDecoded = lastName ? decodeURIComponent(lastName) : "Parker";
  const navigate = useNavigate();
  const reviewResult = useReviewResult();

  const [taskResponse, setTaskResponse] = useState<number>(GetCompetencyScore({ submissionId: submissionId ?? "default-submission-id" }, "task_response") || 5.0);
  const [coherence, setCoherence] = useState<number>(GetCompetencyScore({ submissionId: submissionId ?? "default-submission-id" }, "coherence_cohesion") || 6.5);
  const [lexicalResource, setLexicalResource] = useState<number>(GetCompetencyScore({ submissionId: submissionId ?? "default-submission-id" }, "lexical") || 7.5);
  const [grammar, setGrammar] = useState<number>(GetCompetencyScore({ submissionId: submissionId ?? "default-submission-id" }, "grammar") || 4.0);

  const [selectedCompetency, setSelectedCompetency] = useState<string>("overall");
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [taskResponseFeedback, setTaskResponseFeedback] = useState<string>(GetCompetencyFeedback({ submissionId: submissionId ?? "default-submission-id" }, "task_response") || "");
  const [coherenceFeedback, setCoherenceFeedback] = useState<string>(GetCompetencyFeedback({ submissionId: submissionId ?? "default-submission-id" }, "coherence_cohesion") || "");
  const [lexicalResourceFeedback, setLexicalResourceFeedback] = useState<string>(GetCompetencyFeedback({ submissionId: submissionId ?? "default-submission-id" }, "lexical") || "");
  const [grammarFeedback, setGrammarFeedback] = useState<string>(GetCompetencyFeedback({ submissionId: submissionId ?? "default-submission-id" }, "grammar") || "");
  const [overallFeedback, setOverallFeedback] = useState<string>(GetCompetencyFeedback({ submissionId: submissionId ?? "default-submission-id" }, "overall") || "");

  useEffect(() => {
    setFeedbackText(overallFeedback);
  }, [overallFeedback]);

  const handleEditFeedback = (competency: string) => {
    setSelectedCompetency(competency);
    switch (competency) {
      case "task_response":
        setFeedbackText(taskResponseFeedback);
        break;
      case "coherence_cohesion":
        setFeedbackText(coherenceFeedback);
        break;
      case "lexical":
        setFeedbackText(lexicalResourceFeedback);
        break;
      case "grammar":
        setFeedbackText(grammarFeedback);
        break;
      case "overall":
        setFeedbackText(overallFeedback);
        break;
    }
  };

  const handleFeedbackChange = (value: string) => {
    setFeedbackText(value);
    switch (selectedCompetency) {
      case "task_response":
        setTaskResponseFeedback(value);
        break;
      case "coherence_cohesion":
        setCoherenceFeedback(value);
        break;
      case "lexical":
        setLexicalResourceFeedback(value);
        break;
      case "grammar":
        setGrammarFeedback(value);
        break;
      case "overall":
        setOverallFeedback(value);
        break;
    }
  };

  var overallScore =
    (taskResponse + coherence + lexicalResource + grammar) / 4;

  const handleSave = () => {
    reviewResult.mutate(
      {
        id: submissionId ?? "default-submission-id",
        competencies: [
          {
            competencyName: "task_response",
            resultScore: taskResponse,
            resultFeedback: taskResponseFeedback
          },
          {
            competencyName: "coherence_cohesion",
            resultScore: coherence,
            resultFeedback: coherenceFeedback
          },
          {
            competencyName: "lexical",
            resultScore: lexicalResource,
            resultFeedback: lexicalResourceFeedback
          },
          {
            competencyName: "grammar",
            resultScore: grammar,
            resultFeedback: grammarFeedback
          },
          {
            competencyName: "overall",
            resultScore: overallScore,
            resultFeedback: overallFeedback
          }
        ]
      },
      {
        onSuccess: () => {
          navigate(`/teacher/individual-submission/${submissionId}/${encodeURIComponent(firstNameDecoded)}/${encodeURIComponent(lastNameDecoded)}`);
        },
      }
    );
  };

  const handleCancel = () => {
    navigate(`/teacher/individual-submission/${submissionId}/${encodeURIComponent(firstNameDecoded)}/${encodeURIComponent(lastNameDecoded)}`);
  };

  return (
    <div className="edit-score-page">
      <h2 className="page-title">Edit Student Score</h2>

      <div className="student-card">
        <div className="student-avatar"></div>

        <div>
          <h3>{firstNameDecoded} {lastNameDecoded}</h3>
          <p>ID: 173657</p>
          <p>Class: Advanced English</p>
        </div>
      </div>

      <div className="score-grid">
        <div>
          <ScoreBox
            title="Task Response"
            score={taskResponse}
            onScoreChange={setTaskResponse}
          />
          <button className="edit-feedback-btn" onClick={() => handleEditFeedback("task_response")}>Edit Feedback</button>
        </div>
      
        <div>
          <ScoreBox
            title="Coherence & Cohesion"
            score={coherence}
            onScoreChange={setCoherence}
          />
          <button className="edit-feedback-btn" onClick={() => handleEditFeedback("coherence_cohesion")}>Edit Feedback</button>
        </div>

        <div>
          <ScoreBox
            title="Lexical Resource"
            score={lexicalResource}
            onScoreChange={setLexicalResource}
          />
          <button className="edit-feedback-btn" onClick={() => handleEditFeedback("lexical")}>Edit Feedback</button>
        </div>

        <div>
          <ScoreBox
            title="Grammatical Range + Accuracy"
            score={grammar}
            onScoreChange={setGrammar}
          />
          <button className="edit-feedback-btn" onClick={() => handleEditFeedback("grammar")}>Edit Feedback</button>
        </div>
      </div>

      <div>
        <OverallScore score={overallScore} />
        <button className="edit-feedback-btn" onClick={() => handleEditFeedback("overall")}>Edit Feedback</button>
      </div>

      <div className="feedback-panel">
        <h4>Feedback: {selectedCompetency === "task_response" ? "Task Response" : selectedCompetency === "coherence_cohesion" ? "Coherence & Cohesion" : selectedCompetency === "lexical" ? "Lexical Resource" : selectedCompetency === "grammar" ? "Grammatical Range + Accuracy" : "Overall"}</h4>
        <textarea
          className="feedback-textarea"
          value={feedbackText}
          onChange={(e) => handleFeedbackChange(e.target.value)}
          placeholder="Enter feedback..."
        />
      </div>
      <div className="actions">
        <button className="cancel" onClick={handleCancel}>Cancel</button>
        <button className="save" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}