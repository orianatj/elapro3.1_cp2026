import "./teacher.css";
import "./IndividualSubmission.css";
import ToolbarButton from "../../common/ToolbarButton";
import ToolbarButtonConfirm from "../../common/ToolbarButtonConfirm";
import { useNavigate, useParams } from "react-router-dom";
import { useSubmissionIndividual } from "../../hooks/useSubmissionIndividual";
import { useSubmissionResult } from "../../hooks/useSubmissionResult";

export function IndividualSubmission({ submissionId }: { submissionId: string }) {
  const submissionIndividualQuery = useSubmissionIndividual(submissionId);
  const submission = submissionIndividualQuery.data; // now the actual object

  if (submissionIndividualQuery.isLoading) return <div>Loading...</div>;
  if (submissionIndividualQuery.isError) return <div>Error: {String(submissionIndividualQuery.error)}</div>;

  return (
    <div>
      <h2>Question:</h2>
      <p>{submission?.data.questionText ?? submission?.data.customQuestionText}</p>
      <h2>Response:</h2>
      <p>{submission?.data.essayText ?? "N/A"}</p>
    </div>
  );
}

export function IndividualSubmissionFull({ submissionId }: { submissionId: string }) {
  const submissionIndividualQuery = useSubmissionIndividual(submissionId);
  const submission = submissionIndividualQuery.data; // now the actual object

  if (submissionIndividualQuery.isLoading) return <div>Loading...</div>;
  if (submissionIndividualQuery.isError) return <div>Error: {String(submissionIndividualQuery.error)}</div>;

  return (
    <div>
      <pre>{JSON.stringify(submission, null, 2)}</pre>
    </div>
  );
}

export function IndividualSubmissionWordCount({ submissionId }: { submissionId: string }) {
  const submissionIndividualQuery = useSubmissionIndividual(submissionId);
  const submission = submissionIndividualQuery.data; // now the actual object

  if (submissionIndividualQuery.isLoading) return <div>Loading...</div>;
  if (submissionIndividualQuery.isError) return <div>Error: {String(submissionIndividualQuery.error)}</div>;

  return (
    <div>
      Word Count: {submission?.data.wordCount ?? "N/A"}
    </div>
  );  
}

export function SubmissionResult({ submissionId }: { submissionId: string }) {
  const submissionResultQuery = useSubmissionResult(submissionId);
  const responsePayload = submissionResultQuery.data;
  const result = responsePayload?.results?.[0] ?? responsePayload?.data?.results?.[0];

  if (submissionResultQuery.isLoading) return <div>Loading...</div>;
  if (submissionResultQuery.isError) return <div>Error: {String(submissionResultQuery.error)}</div>;

  const grammar = result?.competencies.find((c: any) => c.competency === "grammar")  ?? { score: "N/A" };
  const coherence = result?.competencies.find((c: any) => c.competency === "coherence_cohesion")  ?? { score: "N/A" };
  const lexical = result?.competencies.find((c: any) => c.competency === "lexical")  ?? { score: "N/A" };
  const taskResponse = result?.competencies.find((c: any) => c.competency === "task_response")  ?? { score: "N/A" };
  const overall = result?.competencies.find((c: any) => c.competency === "overall")  ?? { score: "N/A" };
  
  return (
    <div>
      <p><strong>Task Response:</strong> <strong>{taskResponse.score}</strong> - {taskResponse.feedback}</p>
      <p><strong>Coherence & Cohesion:</strong> <strong>{coherence.score}</strong> - {coherence.feedback}</p>
      <p><strong>Lexical Resource:</strong> <strong>{lexical.score}</strong> - {lexical.feedback}</p>
      <p><strong>Grammatical Range & Accuracy:</strong> <strong>{grammar.score}</strong> - {grammar.feedback}</p>
      <p><strong>Overall:</strong> <strong>{overall.score}</strong> - {overall.feedback}</p>
    </div>
  );  
}

export function SubmissionResultScore({ submissionId }: { submissionId: string }) {
  const submissionResultQuery = useSubmissionResult(submissionId);
  const responsePayload = submissionResultQuery.data;
  const result = responsePayload?.results?.[0] ?? responsePayload?.data?.results?.[0];

  if (submissionResultQuery.isLoading) return <div>Loading...</div>;
  if (submissionResultQuery.isError) return <div>Error: {String(submissionResultQuery.error)}</div>;

  return <>{result?.overallScore ?? "N/A"}</>;
}

export function SubmissionResultFull({ submissionId }: { submissionId: string }) {
  const submissionResultQuery = useSubmissionResult(submissionId);
  const responsePayload = submissionResultQuery.data;
  const result = responsePayload?.results?.[0] ?? responsePayload?.data?.results?.[0];

  if (submissionResultQuery.isLoading) return <div>Loading...</div>;
  if (submissionResultQuery.isError) return <div>Error: {String(submissionResultQuery.error)}</div>;

  return (
    <div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default function IndividualSubmissionPage() {
  const navigate = useNavigate();
  const { submissionId } = useParams<{ submissionId: string }>();

  return (
    <>
      <div className="header">Student's Submission</div>
      <div className="flex-container">
        <div className ="submission-view-card">
            <IndividualSubmission submissionId={submissionId!} />
            <IndividualSubmissionWordCount submissionId={submissionId!} />
        </div>    
        <div className="total-score-card">
            <h2>Overall Score: <SubmissionResultScore submissionId={submissionId!} /></h2>
            <SubmissionResult submissionId={submissionId!} />
            <div className="button-container">
              <ToolbarButton
                icon="/src/assets/pencil.png"
                label="Edit Grade"
                onClick={() => navigate("/teacher/edit-score", { state: { submissionId } })}
              />
              <ToolbarButtonConfirm
                icon="/src/assets/checkmark.png"
                label="OK"
                onClick={() => navigate("/teacher/submissions")}
              />
            </div>
        </div>
      </div>
    </>
  );
}