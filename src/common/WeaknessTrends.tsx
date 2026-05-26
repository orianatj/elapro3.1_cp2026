import React from "react";
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
import "./WeaknessTrends.css";

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

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="weakness-trends__tooltip">
      <div className="weakness-trends__tooltip-title">{label}</div>
      <div className="weakness-trends__tooltip-row">
        <span className="dot dot--task-response" />
        <span>Task Response:</span>
        <strong>{payload[0]?.value ?? 0}</strong>
      </div>
      <div className="weakness-trends__tooltip-row">
        <span className="dot dot--coherence" />
        <span>Coherence + Cohesion:</span>
        <strong>{payload[1]?.value ?? 0}</strong>
      </div>
      <div className="weakness-trends__tooltip-row">
        <span className="dot dot--lexical" />
        <span>Lexical Resource:</span>
        <strong>{payload[2]?.value ?? 0}</strong>
      </div>
      <div className="weakness-trends__tooltip-row">
        <span className="dot dot--range" />
        <span>Range + Accuracy:</span>
        <strong>{payload[3]?.value ?? 0}</strong>
      </div>
    </div>
  );
};

export const WeaknessTrends: React.FC<WeaknessTrendsProps> = ({
  fromDate,
  toDate,
  ieltsType,
  taskType,
  title = "Weakness Trends",
  periodLabel,
}) => {
  const { data, isLoading, isError } = useWeaknessTrends({
    fromDate,
    toDate,
    ieltsType,
    taskType,
  });

  return (
    <section className="weakness-trends">
      <div className="weakness-trends__header">
        <div>
          <h3 className="weakness-trends__title">{title}</h3>
          {periodLabel ? <p className="weakness-trends__subtitle">{periodLabel}</p> : null}
        </div>
      </div>

      <div className="weakness-trends__chart">
        {isLoading ? (
          <div className="weakness-trends__state">Loading chart...</div>
        ) : isError ? (
          <div className="weakness-trends__state weakness-trends__state--error">
            Failed to load weakness trends.
          </div>
        ) : !data?.length ? (
          <div className="weakness-trends__state">No trend data available.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="rgba(15, 23, 42, 0.18)" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                interval={0}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                domain={[0, 10]}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{ paddingTop: 12 }}
              />

              <Line
                type="monotone"
                dataKey="taskResponse"
                name="Task Response"
                stroke="var(--wt-task-response)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="coherenceCohesion"
                name="Coherence + Cohesion"
                stroke="var(--wt-coherence-cohesion)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="lexicalResource"
                name="Lexical Resource"
                stroke="var(--wt-lexical-resource)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="rangeAccuracy"
                name="Range + Accuracy"
                stroke="var(--wt-range-accuracy)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
};