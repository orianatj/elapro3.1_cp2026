import React from "react";
import StatCard from "../../hooks/StatisticCardTemplate.tsx";

// optional: import images instead of using string paths
import business from "../../assets/business.png";
import people from "../../assets/people-circle.png";
import newspaper from "../../assets/newspaper.png";
import podium from "../../assets/podium.png";
import trending from "../../assets/trending-up.png";

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
    value: "270",
    alt: "students",
  },
  {
    icon: newspaper,
    label: "Exams for Review",
    value: "37",
    alt: "reviews",
  },
  {
    icon: podium,
    label: "Avg. Performance",
    value: "75.6%",
    alt: "performance",
  },
  {
    icon: trending,
    label: "Improvement Rate",
    value: "20%",
    alt: "improvement",
  },
];

export default function Stats() {
  return (
    <div className="stats">
      {statsData.map((stat) => (
        <StatCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          alt={stat.alt}
        />
      ))}
    </div>
  );
}