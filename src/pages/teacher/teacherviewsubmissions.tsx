import React, { useMemo, useState } from "react";
import ToolbarButton from "../../common/ToolbarButton";
import TableView from "../../common/TableViewTeacher";
import "./teacher.css";
import "./teachersubmission.css";
import Pagination from "../../common/PageChanger";

export interface Submission {
  firstName: string;
  lastName: string;
  className: string;
  time: string;
  submittedAt: number;
  status: "On Time" | "Late" | "Extension";
}

const submissions: Submission[] = [
  {
    firstName: "Alice",
    lastName: "Johnson",
    className: "IELTS Writing Practice",
    time: "Today, 11:15 AM",
    submittedAt: new Date("2026-05-12T11:15:00").getTime(),
    status: "On Time",
  },
  {
    firstName: "Mark",
    lastName: "Lee",
    className: "IELTS Listening",
    time: "Today, 9:30 PM",
    submittedAt: new Date("2026-05-12T21:30:00").getTime(),
    status: "Late",
  },
  {
    firstName: "Sara",
    lastName: "Kilm",
    className: "IELTS Reading A",
    time: "Yesterday, 4:50 PM",
    submittedAt: new Date("2026-05-11T16:50:00").getTime(),
    status: "Extension",
  },
  {
    firstName: "John",
    lastName: "Patel",
    className: "IELTS Speaking B",
    time: "Yesterday, 2:50 PM",
    submittedAt: new Date("2026-05-11T14:50:00").getTime(),
    status: "On Time",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    className: "IELTS Speaking Practice",
    time: "April 22, 2:10 PM",
    submittedAt: new Date("2026-04-22T14:10:00").getTime(),
    status: "Late",
  },
  {
    firstName: "David",
    lastName: "Chen",
    className: "Listening Practice",
    time: "April 21, 2:35 PM",
    submittedAt: new Date("2026-04-21T14:35:00").getTime(),
    status: "On Time",
  },
];

type SortOption = "" | "name" | "date";

export default function SubmissionsOverview() {
  const [sortBy, setSortBy] = useState<SortOption>("");
  const [search, setSearch] = useState("");

  const filteredAndSorted = useMemo(() => {
    let list = [...submissions];

    // search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((s) =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(q),
      );
    }

    // sort
    if (sortBy === "name") {
      list.sort((a, b) =>
        `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`,
        ),
      );
    } else if (sortBy === "date") {
      list.sort((a, b) => b.submittedAt - a.submittedAt);
    }

    return list;
  }, [sortBy, search]);

  return (
    <div className="container">
      <main className="main">
        <div className="header">Submissions Overview</div>

        <div className="toolbar">
          <div className="search-box">
            <img
              src="/src/assets/search.png"
              alt="search"
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Search by Student"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="toolbar-right">
            <select
              className="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="sort by"
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
            </select>

            <ToolbarButton
              icon="/src/assets/funnel.png"
              label="Filter"
              onClick={() => console.log("Filter clicked")}
            />

            <ToolbarButton
              icon="/src/assets/download.png"
              label="Export"
              onClick={() => console.log("Export clicked")}
            />
          </div>
        </div>

        <TableView submissions={filteredAndSorted} />

        <Pagination />
      </main>
    </div>
  );
}
