import React from "react";
import ToolbarButton from "../../common/ToolbarButton";
import TableView from "../../common/TableViewTeacher";
import "./teacher.css";
import "./teachersubmission.css";
import Pagination from "../../common/PageChanger";

export default function SubmissionsOverview() {
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
            />
          </div>

          <div className="toolbar-right">
            <select
              className="sort-dropdown"
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

        <TableView />

        <Pagination />
      </main>
    </div>
  );
}