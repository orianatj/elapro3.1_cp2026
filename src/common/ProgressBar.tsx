import React, { useMemo } from "react";
import { useSubmissionsList } from "../hooks/useSubmissionsList";
import "./SubmissionProgressChart.css";

interface Props {
  monthLabel?: string;
}

interface Submission {
  submissionId?: string;
  userId?: string;
  ieltsType?: string;
  taskType?: string;
  validated?: string | null;
  flagged?: boolean | null;
  status?: string | null;
}

function Ring({
  value,
  total,
}: {
  value: number;
  total: number;
}) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div
      className="progress-ring"
      style={{
        ["--value" as any]: percentage,
      }}
    >
      <div className="progress-ring__inner">
        <span>{percentage}%</span>
      </div>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  return (
    <div className="progress-row">
      <div className="progress-row__label">{label}</div>
      <Ring value={value} total={total} />
    </div>
  );
}

export default function SubmissionProgressChart({
  monthLabel = "Sept 2025",
}: Props) {
  const { data, isLoading, error } = useSubmissionsList();

  /**
   * IMPORTANT:
   * data = AxiosResponse
   * data.data = API payload
   */
  const items: Submission[] = data?.data?.data?.items ?? [];
  const total = data?.data?.data?.total ?? items.length;

  const stats = useMemo(() => {
    let validated = 0;
    let flagged = 0;
    let aiMarked = 0;
    let pending = 0;

    for (const item of items) {
      const validatedValue = String(item.validated ?? "").toLowerCase();
      const status = String(item.status ?? "").toLowerCase();

      if (item.flagged === true) flagged++;
      if (validatedValue === "validated") validated++;
      if (validatedValue === "pending") pending++;
      if (status === "ai_graded") aiMarked++;
    }

    return { validated, flagged, aiMarked, pending };
  }, [items]);

  if (isLoading) {
    return <div>Loading submissions...</div>;
  }

  if (error) {
    return <div>Failed to load submissions</div>;
  }

  return (
    <div className="band-card">
      <div className="band-card__header">
        <h3>Submission Status Distribution</h3>

        <div className="band-card__period">
          <button className="nav-btn" aria-label="Previous month">
            ‹
          </button>

          <span>{monthLabel}</span>

          <button className="nav-btn" aria-label="Next month">
            ›
          </button>
        </div>
      </div>

      <div className="band-card__count">
        {total} submissions
      </div>

      <div className="band-card__scroll">
        <ProgressRow label="Validated" value={stats.validated} total={total} />
        <ProgressRow label="Flagged" value={stats.flagged} total={total} />
        <ProgressRow label="AI Marked" value={stats.aiMarked} total={total} />
        <ProgressRow label="Pending" value={stats.pending} total={total} />
      </div>
    </div>
  );
}