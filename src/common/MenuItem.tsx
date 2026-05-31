
import { useNavigate } from "react-router-dom";

type Status = "Upcoming" | "On Time" | "LATE";

interface MenuItemProps {
  day?: string;
  title: string;
  time?: string;
  status: Status;
  avatarSrc?: string;
  avatarAlt?: string;
  isAvatar?: boolean;
  onClick?: () => void;
}

export default function MenuItem({
  day,
  title,
  time,
  status,
  avatarSrc,
  avatarAlt = "item",
  isAvatar = false,
  onClick,
}: MenuItemProps){


const handleClick = () => {
  onClick?.();
};

  return (
    <li className="assignment-item" onClick={handleClick}>
      <div className={`assignment-date ${isAvatar ? "avatar-box" : ""}`}>
        {isAvatar ? (
          <img src={avatarSrc} alt={avatarAlt} />
        ) : (
          <span className="day">{day}</span>
        )}
      </div>

      <div className="assignment-title-wrap">
        <strong>{title}</strong>
      </div>

      <div className="assignment-meta">
        {time && <span className="time">{time}</span>}

        <span className={`status ${status === "LATE" ? "late" : ""}`}>
          {status}
        </span>
      </div>
    </li>
  );
}