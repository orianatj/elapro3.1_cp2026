import "./teacher.css";
import "./IndividualSubmission.css";
import ToolbarButton from "../../common/ToolbarButton";
import ToolbarButtonConfirm from "../../common/ToolbarButtonConfirm";

export default function IndividualSubmission() {
  return (
    <>
      <div className="header">Student's Paper</div>
      <div className="flex-container">
        <div className ="submission-view-card">
            <h2>Task 2</h2>
            <p>Vestibulum ac dictum risus. Praesent eget aliquam ligula. Mauris nisi  eros, dignissim ut velit vitae, facilisis luctus nisl. Morbi lacinia ex  eu tortor condimentum tempus. Quisque sagittis blandit leo, in rhoncus  erat rhoncus vitae. Vivamus purus turpis, consequat vel arcu vitae,  rutrum congue massa. Suspendisse id ipsum nec nunc lobortis viverra ac ultricies sapien. Maecenas at mauris non quam lobortis molestie. Vivamus euismod urna ac nisi posuere, in condimentum tellus posuere. Proin id  vehicula risus, dapibus pellentesque metus. Quisque eleifend auctor diam vel facilisis. Nulla facilisi. In venenatis ligula sit amet odio  pulvinar, id feugiat enim pellentesque. In faucibus tempus nulla, nec  aliquet libero tincidunt sit amet. </p>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque  faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi  pretium tellus duis convallis. Tempus leo eu aenean sed diam urna  tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.  Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit  semper vel class aptent taciti sociosqu. Ad litora torquent per conubia  nostra inceptos himenaeos.
Lorem ipsum dolor sit amet consectetur  adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu  aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus </p>
          <div className="flex-container">
            <p>Word Count: 1200</p>
            <p>Errors Found: 5</p>
            <p>Suggestions: 4</p>
          </div>
        </div>
        
        <div>
          <div className="total-score-card">
            <h2>Total Score</h2>
            <p>Task Response: 6.0 - Addresses the topic but lacks depth in argumentation.</p>
            <p>Coherence & Cohesion: 6.0 - Well structured with clear paragraphs</p>
            <p>Lexical Resource: 6.5 - Limited range of vocabulary, some errors.</p>
            <p>Grammatical Range & Accuracy 6.0 - Several grammar mistakes and sentence errors</p>

          </div>

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