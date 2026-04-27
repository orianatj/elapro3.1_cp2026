import React from "react";

interface ToolbarButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

export default function ToolbarButton({
  icon,
  label,
  onClick,
}: ToolbarButtonProps) {
  return (
    <button className="btn" onClick={onClick}>
      <img src={icon} alt={label} />
      <span>{label}</span>
      <span className="spacer"></span>
    </button>
  );
}