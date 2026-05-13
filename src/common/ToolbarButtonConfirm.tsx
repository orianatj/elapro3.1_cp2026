
interface ToolbarButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

export default function ToolbarButtonConfirm({
  icon,
  label,
  onClick,
}: ToolbarButtonProps) {
  return (
    <button className="btn-confirm" onClick={onClick}>
      <img src={icon} alt={label} />
      <span>{label}</span>
      <span className="spacer"></span>
    </button>
  );
}