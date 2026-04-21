import React from "react";

type StatCardProps = {
  icon: string;
  label: string;
  value: string;
  alt: string;
};

export default function StatCard({ icon, label, value, alt }: StatCardProps) {
  return (
    <div className="card">
      <img src={icon} alt={alt} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}