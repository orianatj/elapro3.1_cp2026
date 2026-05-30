

type ScoreBoxProps = {
  title: string;
  score: number;
  onScoreChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  formatScore?: (value: number) => React.ReactNode;
};

export default function ScoreBox({
  title,
  score,
  onScoreChange,
  min = 1,
  max = 9,
  step = 0.5,
  disabled = false,
  formatScore,
}: ScoreBoxProps) {
  const displayScore = formatScore ? formatScore(score) : score.toFixed(1);

  return (
    <div className="score-box">
      <h4>{title}</h4>
      <h2>{displayScore}</h2>

      <div className="slider-wrapper">
        <div className="score-slider">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={score}
            disabled={disabled}
            onChange={(e) => onScoreChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}