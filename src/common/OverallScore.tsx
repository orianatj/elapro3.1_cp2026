import React from "react";


type OverallScoreProps = {
  score: number;
};

const getLevel = (score: number): string => {
  if (score >= 8) return "Very Good User";
  if (score >= 7) return "Good User";
  if (score >= 6) return "Competent User";
  if (score >= 5) return "Modest User";
  return "Limited User";
};

const getDescription = (score: number): string => {
  if (score >= 8) return "Excellent English proficiency.";
  if (score >= 7) return "Strong command of English with occasional errors.";
  if (score >= 6) return "Generally effective command of English.";
  if (score >= 5) return "Partial command with noticeable mistakes.";
  return "Needs improvement in English communication.";
};

const OverallScore: React.FC<OverallScoreProps> = ({ score }) => {
  return (
    <div className="overall-score">
      <div className="overall-score__header">Overall Score</div>

      <div className="overall-score__body">
        <div className="score-value">
          <span className="score-badge">{score.toFixed(1)}</span>
          <p className="level-text">Level: {getLevel(score)}</p>
        </div>
      </div>

      <div className="overall-score__footer">
        <p className="description">{getDescription(score)}</p>
      </div>
    </div>
  );
};

export default OverallScore;