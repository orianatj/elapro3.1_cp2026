import "./AdminSubscriptionsPage.css";

type SubscriptionRow = {
  organisation: string;
  plan: string;
  status: string;
  usage: string;
  renewalDate: string;
  lastUpdated: string;
};

const subscriptionData: SubscriptionRow[] = [
  {
    organisation: "User 1",
    plan: "Premium",
    status: "Active",
    usage: "34 / 100 submissions",
    renewalDate: "15-Mar-26",
    lastUpdated: "2-Feb-26",
  },
  {
    organisation: "User 2",
    plan: "Basic",
    status: "Active",
    usage: "12 / 50 submissions",
    renewalDate: "28-Feb-26",
    lastUpdated: "30-Jan-26",
  },
  {
    organisation: "User 3",
    plan: "Institutional",
    status: "Active",
    usage: "420 / 1000 submissions",
    renewalDate: "1-Apr-26",
    lastUpdated: "5-Feb-26",
  },
  {
    organisation: "User 4",
    plan: "Premium",
    status: "Expiring Soon",
    usage: "88 / 100 submissions",
    renewalDate: "20-Feb-26",
    lastUpdated: "10-Feb-26",
  },
  {
    organisation: "User 4",
    plan: "Basic",
    status: "Inactive",
    usage: "0 / 50 submissions",
    renewalDate: "—",
    lastUpdated: "15-Jan-26",
  },
  {
    organisation: "User 5",
    plan: "Institutional",
    status: "Active",
    usage: "610 / 1000 submissions",
    renewalDate: "12-May-26",
    lastUpdated: "8-Feb-26",
  },
  {
    organisation: "User 6",
    plan: "Premium",
    status: "Active",
    usage: "56 / 100 submissions",
    renewalDate: "9-Mar-26",
    lastUpdated: "1-Feb-26",
  },
];

export default function AdminSubscriptionsPage() {
  return (
    <div className="admin-subscriptions-page">
      <section className="admin-subscriptions-header">
        <div>
          <h1>Subscriptions</h1>

          <div className="admin-subscriptions-breadcrumb">
            <span className="home-icon">⌂</span>
            <strong>Home &gt; Subscriptions</strong>
          </div>
        </div>

        <button className="filter-icon-button">≡</button>
      </section>

      <section className="admin-subscriptions-toolbar">
        <div className="subscription-search-box">
          <span>☰</span>
          <input type="text" placeholder="Hinted search txt" />
          <span>⌕</span>
        </div>

        <button className="export-button" title="Export CSV">
          ⇩
        </button>
      </section>

      <section className="subscriptions-table-wrapper">
        <table className="subscriptions-table">
          <thead>
            <tr>
              <th>User / Organisation</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Usage</th>
              <th>Renewal Date</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {subscriptionData.map((item, index) => (
              <tr key={`${item.organisation}-${index}`}>
                <td>{item.organisation}</td>
                <td>{item.plan}</td>
                <td>{item.status}</td>
                <td>{item.usage}</td>
                <td>{item.renewalDate}</td>
                <td>{item.lastUpdated}</td>
                <td>
                  <button className="view-button">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="subscriptions-pagination">
          « Prev | <strong>1</strong> | 2 | Next »
        </div>
      </section>
    </div>
  );
}