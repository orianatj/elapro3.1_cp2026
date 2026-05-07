import React from "react";

type ScoreBoxProps = {
  title: string;
  score: number;
  onScoreChange: (value: number) => void;
};

export default function ScoreBox({
  title,
  score,
  onScoreChange,
}: ScoreBoxProps) {
  return (
    <div className="score-box">
      <h4>{title}</h4>
      <h2>{score.toFixed(1)}</h2>

      <div className="slider-wrapper">
        <div className="score-slider">
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={score}
            onChange={(e) => onScoreChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}