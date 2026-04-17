import React from "react";
import "./teacher.css";

export default function Dashboard() {
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="top-section">
          <div className="logo">
            <img src="src/assets/logo.png" alt="dashboard" />
            <p>Teacher</p>
          </div>

          <div className="top-icons">
            <img
              className="avatar"
              src="src/assets/Avatar.png"
              alt="user icon"
            />

            <div className="notification-wrapper">
              <img
                src="src/assets/notifications.png"
                alt="notifications icon"
              />
              <span className="badge">2</span>
            </div>
          </div>
        </div>

        <nav>
          <ul>
            <li>
              <img src="src/assets/grid.png" alt="dashboard" />
              Dashboard
            </li>
            <li>
              <img src="src/assets/create.png" alt="assignments" />
              Assignments
            </li>
            <li>
              <img src="src/assets/file-tray-full.png" alt="resources" />
              Resources
            </li>
            <li>
              <img src="src/assets/documents.png" alt="submissions" />
              Submissions
            </li>
            <li>
              <img src="src/assets/vector.png" alt="settings" />
              Settings
            </li>
            <li>
              <img src="src/assets/help.png" alt="help" />
              Help
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main">
        <div className="header">Welcome back, [[USER NAME]]</div>

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
          <div className="chart-box">Band Distribution</div>
          <div className="chart-box">Exam Progress</div>
          <div className="chart-box large">Weakness Trends</div>
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
