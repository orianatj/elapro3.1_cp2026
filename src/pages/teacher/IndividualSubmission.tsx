import "./teacher.css";
import "./IndividualSubmission.css";
import ToolbarButton from "../../common/ToolbarButton";


export default function IndividualSubmission() {
  return (
    <>
      <div className="header">Student's Paper</div>
      <div className="flex-container">
        <div className ="submission-view-card">
          <div>
            <h2>Task 2</h2>
            <p>Vestibulum ac dictum risus. Praesent eget aliquam ligula. Mauris nisi  eros, dignissim ut velit vitae, facilisis luctus nisl. Morbi lacinia ex  eu tortor condimentum tempus. Quisque sagittis blandit leo, in rhoncus  erat rhoncus vitae. Vivamus purus turpis, consequat vel arcu vitae,  rutrum congue massa. Suspendisse id ipsum nec nunc lobortis viverra ac ultricies sapien. Maecenas at mauris non quam lobortis molestie. Vivamus euismod urna ac nisi posuere, in condimentum tellus posuere. Proin id  vehicula risus, dapibus pellentesque metus. Quisque eleifend auctor diam vel facilisis. Nulla facilisi. In venenatis ligula sit amet odio  pulvinar, id feugiat enim pellentesque. In faucibus tempus nulla, nec  aliquet libero tincidunt sit amet. </p>
          </div>
          <div>
            Word Count: 1200  Errors Found: 5   Suggestions: 4
          </div>
        </div>
        
        <div>
          <div className="total-score-info">
            <h2>Total Score</h2>
            <p>Task Response: 6.0 - Addresses the topic but lacks depth in argumentation.</p>
            <p>Coherence & Cohesion: 6.0 - Well structured with clear paragraphs</p>
            <p>Lexical Resource: 6.5 - Limited range of vocabulary, some errors.</p>
            <p>Grammatical Range & Accuracy 6.0 - Several grammar mistakes and sentence errors</p>

          </div>

          <div className="flex-container">
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
            <ToolbarButton
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