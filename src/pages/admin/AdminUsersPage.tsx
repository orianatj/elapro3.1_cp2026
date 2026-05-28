import "./AdminUsersPage.css";

type UserRow = {
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
};

const users: UserRow[] = [
  {
    name: "John Smith",
    email: "john@email.com",
    role: "Student",
    status: "Active",
    lastActive: "2 Feb 26",
  },
  {
    name: "Sarah Lee",
    email: "sarah@email.com",
    role: "Teacher",
    status: "Active",
    lastActive: "1 Feb 26",
  },
  {
    name: "Admin User",
    email: "admin@email.com",
    role: "Admin",
    status: "Suspended",
    lastActive: "28 Jan 26",
  },
];

const feedbackCards = [
  {
    name: "Steven J.",
    role: "Teacher",
    image: "/src/assets/Avatar.png",
    rating: "★★★★★",
  },
  {
    name: "Mary T.",
    role: "Student",
    image: "/src/assets/Avatar.png",
    rating: "★★★★☆",
  },
];

export default function AdminUsersPage() {
  return (
    <div className="admin-users-page">
      <section className="admin-users-header">
        <h1>Users</h1>

        <div className="admin-breadcrumb">
          <div className="admin-home-icon">⌂</div>
          <span>Home &gt; Users</span>
        </div>
      </section>

      <section className="admin-users-toolbar">
        <div className="admin-search-box">
          <span className="search-menu-icon">☰</span>
          <input type="text" placeholder="Hinted search text" />
          <span className="search-icon">⌕</span>
        </div>

        <div className="admin-user-actions">
          <button>+Add User</button>
          <button>Filter</button>
          <button>Views</button>
          <button>Delete User</button>
        </div>
      </section>

      <section className="admin-users-table-wrapper">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>{user.lastActive}</td>
                <td>
                  <button className="table-action">View</button>
                  <span>|</span>
                  <button className="table-action">Change</button>
                  <span>|</span>
                  <button className="table-action">Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="admin-pagination">
          &lt; Prev <strong>1</strong> | 2 | Next &gt;
        </div>
      </section>

      <section className="admin-feedback-grid">
        {feedbackCards.map((card) => (
          <article className="admin-feedback-card" key={card.name}>
            <div className="feedback-card-header">
              <img src={card.image} alt={card.name} />

              <div>
                <h3>{card.name}</h3>
                <p className="star-rating">{card.rating}</p>
              </div>

              <span>{card.role}</span>
            </div>

            <div className="fake-text-lines">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div className="short-line"></div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}