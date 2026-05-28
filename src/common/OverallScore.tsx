import React from "react";

type ScoreBand = {
  min: number;
  label: string;
  description: string;
};

type OverallScoreProps = {
  score: number;
  title?: string;
  bands?: ScoreBand[];
  precision?: number;
  className?: string;
  scoreFormatter?: (score: number) => string;
};

const defaultBands: ScoreBand[] = [
  {
    min: 8,
    label: "Very Good User",
    description: "Excellent English proficiency.",
  },
  {
    min: 7,
    label: "Good User",
    description: "Strong command of English with occasional errors.",
  },
  {
    min: 6,
    label: "Competent User",
    description: "Generally effective command of English.",
  },
  {
    min: 5,
    label: "Modest User",
    description: "Partial command with noticeable mistakes.",
  },
  {
    min: 0,
    label: "Limited User",
    description: "Needs improvement in English communication.",
  },
];

const getBand = (score: number, bands: ScoreBand[]): ScoreBand => {
  const sortedBands = [...bands].sort((a, b) => b.min - a.min);
  return sortedBands.find((band) => score >= band.min) ?? sortedBands[sortedBands.length - 1];
};

const OverallScore: React.FC<OverallScoreProps> = ({
  score,
  title = "Overall Score",
  bands = defaultBands,
  precision = 1,
  className = "",
  scoreFormatter,
}) => {
  const band = getBand(score, bands);

  const formattedScore =
    scoreFormatter?.(score) ?? score.toFixed(precision);

  return (
    <div className={`overall-score ${className}`.trim()}>
      <div className="overall-score__header">{title}</div>

      <div className="overall-score__body">
        <div className="score-value">
          <span className="score-badge">{formattedScore}</span>
          <p className="level-text">Level: {band.label}</p>
        </div>
      </div>

      <div className="overall-score__footer">
        <p className="description">{band.description}</p>
      </div>
    </div>
  );
};

export default OverallScore;