import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useWeaknessTrends } from "../hooks/useWeaknessTrends";
import "../pages/teacher/WeaknessTrends.css";

type WeaknessTrendsProps = {
  fromDate?: string | null;
  toDate?: string | null;
  ieltsType?: "academic" | "general" | null;
  taskType?: "task1" | "task2" | null;
  title?: string;
  periodLabel?: string;
};

type TooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

type SeriesKey =
  | "taskResponse"
  | "coherenceCohesion"
  | "lexicalResource"
  | "rangeAccuracy";

type LegendProps = {
  visibility: Record<SeriesKey, boolean>;
  onToggle: (key: SeriesKey) => void;
};

const LINE_PROPS = {
  type: "monotone" as const,
  strokeWidth: 2.5,
  dot: false,
  activeDot: { r: 4 },
};

const SERIES = [
  {
    key: "taskResponse" as const,
    name: "Task Response",
    dotClass: "dot--task-response",
    stroke: "var(--wt-task-response)",
  },
  {
    key: "coherenceCohesion" as const,
    name: "Coherence + Cohesion",
    dotClass: "dot--coherence",
    stroke: "var(--wt-coherence-cohesion)",
  },
  {
    key: "lexicalResource" as const,
    name: "Lexical Resource",
    dotClass: "dot--lexical",
    stroke: "var(--wt-lexical-resource)",
  },
  {
    key: "rangeAccuracy" as const,
    name: "Range + Accuracy",
    dotClass: "dot--range",
    stroke: "var(--wt-range-accuracy)",
  },
];

const CustomTooltip: React.FC<TooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length) return null;

  const getValue = (key: SeriesKey) =>
    payload.find((item) => item.dataKey === key)?.value ?? 0;

  return (
    <div className="weakness-trends__tooltip">
      <div className="weakness-trends__tooltip-title">
        {label}
      </div>

      {SERIES.map((series) => (
        <div
          key={series.key}
          className="weakness-trends__tooltip-row"
        >
          <span className={`dot ${series.dotClass}`} />
          <span>{series.name}:</span>
          <strong>{getValue(series.key)}</strong>
        </div>
      ))}
    </div>
  );
};

const CustomLegend: React.FC<LegendProps> = ({
  visibility,
  onToggle,
}) => {
  return (
    <div className="weakness-trends__legend">
      {SERIES.map((series) => {
        const active = visibility[series.key];

        return (
          <button
            key={series.key}
            type="button"
            onClick={() => onToggle(series.key)}
            aria-pressed={active}
            className={`weakness-trends__legend-item ${active
                ? "weakness-trends__legend-item--active"
                : "weakness-trends__legend-item--inactive"
              }`}
          >
            <span className={`dot ${series.dotClass}`} />
            <span className="weakness-trends__legend-text">
              {series.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export const WeaknessTrends: React.FC<
  WeaknessTrendsProps
> = ({
  fromDate,
  toDate,
  ieltsType,
  taskType,
  title = "Weakness Trends",
  periodLabel,
}) => {
    const { data, isLoading, isError } =
      useWeaknessTrends({
        fromDate,
        toDate,
        ieltsType,
        taskType,
      });

    const [visibility, setVisibility] =
      useState<Record<SeriesKey, boolean>>({
        taskResponse: true,
        coherenceCohesion: true,
        lexicalResource: true,
        rangeAccuracy: true,
      });

    const toggleSeries = (key: SeriesKey) => {
      setVisibility((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };

    return (
      <section className="weakness-trends">
        <div className="weakness-trends__header">
          <div>
            <h3 className="weakness-trends__title">
              {title}
            </h3>

            {periodLabel && (
              <p className="weakness-trends__subtitle">
                {periodLabel}
              </p>
            )}
          </div>
        </div>

        <div className="weakness-trends__chart">
          {isLoading ? (
            <div className="weakness-trends__state">
              Loading chart...
            </div>
          ) : isError ? (
            <div className="weakness-trends__state weakness-trends__state--error">
              Failed to load weakness trends.
            </div>
          ) : !data?.length ? (
            <div className="weakness-trends__state">
              No trend data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 12,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  className="weakness-trends__grid"
                />

                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 10]}
                  allowDecimals={false}
                />

                <Tooltip
                  content={<CustomTooltip />}
                />

                <Legend
                  content={
                    <CustomLegend
                      visibility={visibility}
                      onToggle={toggleSeries}
                    />
                  }
                />

                {SERIES.map(
                  (series) =>
                    visibility[series.key] && (
                      <Line
                        key={series.key}
                        {...LINE_PROPS}
                        dataKey={series.key}
                        name={series.name}
                        stroke={series.stroke}
                      />
                    )
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>
    );
  };