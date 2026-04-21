import React from "react";
import "./teacher.css";
import Sidebar from "./../../common/SideBarTeacher.tsx";

export default function Dashboard() {
  return (
    <div className="container">
    <Sidebar />
      <main className="main">
        <div className="header">Welcome back, [[USER NAME]]</div>
          <h3>Overall Performance</h3>

        <div className="stats">
          <div className="card">
            <img src="src/assets/business.png" alt="submissions" />
            <span>My Courses</span>
            <strong>4</strong>
          </div>

          <div className="card">
            <img src="src/assets/people-circle.png" alt="students" />
            <span># Of Students</span>
            <strong>270</strong>
          </div>

          <div className="card">
            <img src="src/assets/newspaper.png" alt="reviews" />
            <span>Exams for Review</span>
            <strong>37</strong>
          </div>

          <div className="card">
            <img src="src/assets/podium.png" alt="performance" />
            <span>Avg. Performance</span>
            <strong>75.6%</strong>
          </div>

          <div className="card">
            <img src="src/assets/trending-up.png" alt="improvement" />
            <span>Improvement Rate</span>
            <strong>20%</strong>
          </div>
        </div>
  

        <div className="charts">
          <div className="chart-box">  <img src= "src\assets\Student-Statistic.png"/> </div>
          <div className="chart-box"><img src= "src\assets\Class-Progress.png"/></div>
          <div className="chart-box large"><img src= "src\assets\Attendance.png"/></div>
        </div>

        <div className="bottom">
          <div className="list">
            <div className="list-header">
              <h3>Recent Assignments</h3>
              <span className="see-all">See all</span>
            </div>

            <div className="divider"></div>

            <ul className="assignment-list">
              <li className="assignment-item">
                <div className="assignment-date">
                  <span className="day">23</span>
                </div>

                <div className="assignment-title-wrap">
                  <strong>Learning Basics 2a</strong>
                </div>

                <div className="assignment-meta">
                  <span className="time">12 P.M.</span>
                  <span className="status">Upcoming</span>
                </div>
              </li>

              <li className="assignment-item">
                <div className="assignment-date">
                  <span className="day">24</span>
                </div>

                <div className="assignment-title-wrap">
                  <strong>Biology Assessment 1b</strong>
                </div>

                <div className="assignment-meta">
                  <span className="time">2 P.M.</span>
                  <span className="status">Upcoming</span>
                </div>
              </li>

              <li className="assignment-item">
                <div className="assignment-date">
                  <span className="day">25</span>
                </div>

                <div className="assignment-title-wrap">
                  <strong>Analysis Comp 2c</strong>
                </div>

                <div className="assignment-meta">
                  <span className="time">4 P.M.</span>
                  <span className="status">Upcoming</span>
                </div>
              </li>
            </ul>
          </div>

         <div className="list">
  <div className="list-header">
    <h3>Submission View</h3>
    <span className="see-all">See all</span>
  </div>

  <div className="divider"></div>

  <ul className="assignment-list">
    <li className="assignment-item">
      <div className="assignment-date avatar-box">
        <img src="src/assets/ClipboardList.png" alt="student" />
      </div>

      <div className="assignment-title-wrap">
        <strong>Steven Stone</strong>
      </div>

      <div className="assignment-meta">
        <span className="status">On Time</span>
      </div>
    </li>

    <li className="assignment-item">
      <div className="assignment-date avatar-box">
        <img src="src/assets/ClipboardList.png" alt="student" />
      </div>

      <div className="assignment-title-wrap">
        <strong>Joyle Jackie</strong>
      </div>

      <div className="assignment-meta">
        <span className="status">On Time</span>
      </div>
    </li>

    <li className="assignment-item">
      <div className="assignment-date avatar-box">
        <img src="src/assets/ClipboardList.png" alt="student" />
      </div>

      <div className="assignment-title-wrap">
        <strong>Kyle Cone</strong>
      </div>

      <div className="assignment-meta">
        <span className="status late">LATE</span>
      </div>
    </li>
  </ul>
</div>
        </div>
      </main>
    </div>
  );
}
