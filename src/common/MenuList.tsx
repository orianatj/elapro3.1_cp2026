import React from "react";
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
        <span className="see-all">See all</span>
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