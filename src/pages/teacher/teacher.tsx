import React from "react";
import "./teacher.css";
import Stats from "../../types/teacher/StatisticBoxTemplate.tsx";
import Sidebar from "../../common/SideBarTeacher.tsx";

export default function Dashboard() {
  return (
    <div className="container">
          <Sidebar />
      <main className="main">
        <div className="header">Welcome back, [[USER NAME]]</div>
          <h3>Overall Performance</h3>

         <Stats />

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
