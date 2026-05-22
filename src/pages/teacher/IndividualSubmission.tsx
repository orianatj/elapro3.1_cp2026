import "./teacher.css";
import "./IndividualSubmission.css";
import ToolbarButton from "../../common/ToolbarButton";
import ToolbarButtonConfirm from "../../common/ToolbarButtonConfirm";
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

  return (
    <div>
      <p><strong>Task Response:</strong> <strong>{result?.competencies?.[0]?.score ?? "N/A"}</strong> - {result?.competencies?.[0]?.feedback ?? "N/A"}</p>
      <p><strong>Coherence & Cohesion:</strong> <strong>{result?.competencies?.[1]?.score ?? "N/A"}</strong> - {result?.competencies?.[1]?.feedback ?? "N/A"}</p>
      <p><strong>Lexical Resource:</strong> <strong>{result?.competencies?.[2]?.score ?? "N/A"}</strong> - {result?.competencies?.[2]?.feedback ?? "N/A"}</p>
      <p><strong>Grammatical Range & Accuracy:</strong> <strong>{result?.competencies?.[3]?.score ?? "N/A"}</strong> - {result?.competencies?.[3]?.feedback ?? "N/A"}</p>
      <p><strong>Overall:</strong> <strong>{result?.competencies?.[4]?.score ?? "N/A"}</strong> - {result?.competencies?.[4]?.feedback ?? "N/A"}</p>
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
const submissionId = "9ec9b32e-7e2f-4f63-887b-c95bc3cefb33"; // Example submission ID

  return (
    <>
      <div className="header">Student's Submission</div>
      <div className="flex-container">
        <div className ="submission-view-card">
            <IndividualSubmission submissionId={submissionId} />
            <IndividualSubmissionWordCount submissionId={submissionId} />
        </div>    
        <div className="total-score-card">
            <h2>Overall Score: <SubmissionResultScore submissionId={submissionId} /></h2>
            <SubmissionResult submissionId={submissionId} />
            <div className="button-container">
            <ToolbarButton
              icon="/src/assets/comment.png"
              label="Add Comment"
              onClick={() => console.log("Comment clicked")}
              />
              <ToolbarButton
                icon="/src/assets/pencil.png"
                label="Edit Grade"
                onClick={() => console.log("Edit grade clicked")}
              />
              <ToolbarButtonConfirm
                icon="/src/assets/checkmark.png"
                label="Verify"
                onClick={() => console.log("Verify clicked")}
              />
            </div>
        </div>
      </div>

    
    </>
  );
}