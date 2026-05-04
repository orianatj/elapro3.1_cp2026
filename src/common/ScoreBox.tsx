import React from "react";

type ScoreBoxProps = {
  title: string;
  score: string;
};

export default function ScoreBox({ title, score }: ScoreBoxProps) {
  return (
    <div className="score-box">
      <h4>{title}</h4>
      <h2>{score}</h2>

      <div className="slider-wrapper">
        <div className="score-slider">
          <input type="range" />
        </div>
      </div>
    </div>
  );
}