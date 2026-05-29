
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

type Status = "Upcoming" | "On Time" | "LATE";

export interface MenuData {
  id: string;
  day?: string;
  title: string;
  time?: string;
  status: Status;
  avatarSrc?: string;
  avatarAlt?: string;
  isAvatar?: boolean;
}

interface MenuListProps {
  title: string;
  items: MenuData[];
}

export default function MenuList({ title, items }: MenuListProps) {
  return (
    <div className="list">
      <div className="list-header">
        <h3>{title}</h3>

        <Link to="/MenuItem" className="see-all">
          See all
        </Link>
      </div>

      <div className="divider"></div>

      <ul className="assignment-list">
        {items.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}