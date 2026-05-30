import { useMemo } from "react";
import { useSubmissionTeacherResults } from "../../hooks/useResultsTeacher";

import business from "../../assets/business.png";
import people from "../../assets/people-circle.png";
import newspaper from "../../assets/newspaper.png";
import podium from "../../assets/podium.png";
import trending from "../../assets/trending-up.png";

import StatCard from "../../common/StatisticCardTemplate";

type SubmissionItem = {
  overallScore?: number | string;
  validated?: boolean;
  flagged?: boolean;
  status?: string;
  userId?: string;
};

export default function Stats() {
  const { data, isLoading, isError } =
    useSubmissionTeacherResults({ limit: 100 });

  const results: SubmissionItem[] = useMemo(() => {
    const payload = data?.data;

    if (Array.isArray(payload)) return payload;

    return payload?.items ?? payload?.data?.items ?? [];
  }, [data]);

  const stats = useMemo(() => {
    const total = results.length;

    const scores = results
      .map((item) => Number(item.overallScore))
      .filter((score) => !Number.isNaN(score));

    const avgScore =
      scores.length > 0
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : 0;

    const validatedCount = results.filter((item) => item.validated).length;
    const flaggedCount = results.filter((item) => item.flagged).length;

    const uniqueStudents = new Set(
      results.map((item) => item.userId).filter((id): id is string => Boolean(id))
    ).size;

    return {
      total,
      avgScore,
      validatedCount,
      flaggedCount,
      uniqueStudents,
    };
  }, [results]);

  if (isLoading) return <div>Loading stats...</div>;
  if (isError) return <div>Failed to load stats</div>;

  const statsData = [
    {
      icon: business,
      label: "My Courses",
      value: "4",
      alt: "courses",
    },
    {
      icon: people,
      label: "# Of Students",
      value: stats.uniqueStudents.toString(),
      alt: "students",
    },
    {
      icon: newspaper,
      label: "Exams for Review",
      value: stats.total.toString(),
      alt: "reviews",
    },
    {
      icon: podium,
      label: "Avg. Performance",
      value: `${stats.avgScore.toFixed(1)}/9`,
      alt: "performance",
    },
    {
      icon: trending,
      label: "Improvement Rate",
      value: `${stats.validatedCount} validated`,
      alt: "improvement",
    },
  ];

  return (
    <div className="stats">
      {statsData.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}