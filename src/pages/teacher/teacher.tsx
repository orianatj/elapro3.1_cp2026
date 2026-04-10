import React from "react";
import "./teacher.css";

export default function Dashboard() {
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo"> <img src="src\assets\logo.png" alt="dashboard" /><p>Teacher</p></div>
      <nav>
  <ul>
    <li>
      <img src="src\assets\grid.png" alt="dashboard" />
      Dashboard
    </li>
    <li>
      <img src="src\assets\create.png" alt="assignments" />
      Assignments
    </li>
    <li>
      <img src="src\assets\file-tray-full.png" alt="resources" />
      Resources
    </li>
    <li>
      <img src="src\assets\documents.png" alt="submissions" />
      Submissions
    </li>
    <li>
      <img src="src\assets\vector.png" alt="settings" />
      Settings
    </li>
    <li>
      <img src="src\assets\help.png" alt="help" />
      Help
    </li>
  </ul>
</nav>
      </aside>

      <main className="main">
        <div className="header">Welcome back, [[USER NAME]]</div>

        <div className="stats">
          <div className="card">My Courses <strong>4</strong></div>
          <div className="card"># Of Students <strong>270</strong></div>
          <div className="card">Exams for Review <strong>37</strong></div>
          <div className="card">Avg. Performance <strong>75.6%</strong></div>
          <div className="card">Improvement Rate <strong>20%</strong></div>
        </div>

        <div className="charts">
          <div className="chart-box">Band Distribution</div>
          <div className="chart-box">Exam Progress</div>
          <div className="chart-box large">Weakness Trends</div>
        </div>

        <div className="bottom">
          <div className="list">
            <h3>Recent Assignments</h3>
            <ul>
              <li>Biology Assessment 1b</li>
              <li>Learning Basics 2a</li>
              <li>Analysis Comp 2c</li>
            </ul>
          </div>

          <div className="list">
            <h3>Submission View</h3>
            <ul>
              <li>Steven Stone - On Time</li>
              <li>Joyle Jackie - On Time</li>
              <li>Kyle Cone - Late</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
