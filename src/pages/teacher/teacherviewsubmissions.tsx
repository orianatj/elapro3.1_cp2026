import React from "react";
import Sidebar from "../../common/SideBarTeacher";
import SubmissionTable from "../../common/TableViewTeacher";
import ToolbarButton from "../../common/ToolbarButton";
import Pagination from "../../common/PageChanger";
import "./teacher.css";
import "./teachersubmission.css";

interface Submission {
  firstName: string;
  lastName: string;
  className: string;
  time: string;
  status: "On Time" | "Late" | "Extension";
}

const submissions: Submission[] = [
  {
    firstName: "Alice",
    lastName: "Johnson",
    className: "IELTS Writing Practice",
    time: "Today, 11:15 AM",
    status: "On Time",
  },
  {
    firstName: "Mark",
    lastName: "Lee",
    className: "IELTS Listening",
    time: "Today, 9:30 PM",
    status: "Late",
  },
  {
    firstName: "Sara",
    lastName: "Kilm",
    className: "IELTS Reading A",
    time: "Yesterday, 4:50 PM",
    status: "Extension",
  },
  {
    firstName: "John",
    lastName: "Patel",
    className: "IELTS Speaking B",
    time: "Yesterday, 2:50 PM",
    status: "On Time",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    className: "IELTS Speaking Practice",
    time: "April 22, 2:10 PM",
    status: "Late",
  },
  {
    firstName: "David",
    lastName: "Chen",
    className: "Listening Practice",
    time: "April 21, 2:35 PM",
    status: "On Time",
  },
  {
    firstName: "John",
    lastName: "Patel",
    className: "IELTS Speaking B",
    time: "Yesterday, 2:50 PM",
    status: "On Time",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    className: "IELTS Speaking Practice",
    time: "April 22, 2:10 PM",
    status: "Late",
  },
  {
    firstName: "David",
    lastName: "Chen",
    className: "Listening Practice",
    time: "April 21, 2:35 PM",
    status: "On Time",
  },
  {
    firstName: "John",
    lastName: "Patel",
    className: "IELTS Speaking B",
    time: "Yesterday, 2:50 PM",
    status: "On Time",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    className: "IELTS Speaking Practice",
    time: "April 22, 2:10 PM",
    status: "Late",
  },
  {
    firstName: "David",
    lastName: "Chen",
    className: "Listening Practice",
    time: "April 21, 2:35 PM",
    status: "On Time",
  },
];

export default function SubmissionsOverview() {
  return (
    <>
      <div className="header">Submissions Overview</div>

      {/* Top Controls */}
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
          />
        </div>

        <div className="toolbar-right">
          <select className="sort-dropdown">
            <option>Sort By</option>
            <option>Name</option>
            <option>Date</option>
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

      <SubmissionTable submissions={submissions} />

      {/* Pagination */}
      <div className="pagination">
        <button>{"<"}</button>
        <span className="active">1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>...</span>
        <span>12</span>
        <button>{">"}</button>
      </div>
    </>
  );
}