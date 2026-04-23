import React from "react";
import AssignmentItem from "./MenuItem";

interface Assignment {
  day?: string;
  title: string;
  time?: string;
  status: string;
  isLate?: boolean;
  avatar?: string;
  isSubmission?: boolean;
}

interface AssignmentListProps {
  title: string;
  items: Assignment[];
}

export default function AssignmentList({
  title,
  items,
}: AssignmentListProps) {
  return (
    <div className="list">
      <div className="list-header">
        <h3>{title}</h3>
        <span className="see-all">See all</span>
      </div>

      <div className="divider"></div>

      <ul className="assignment-list">
        {items.map((item, index) => (
          <AssignmentItem key={index} {...item} />
        ))}
      </ul>
    </div>
  );
}