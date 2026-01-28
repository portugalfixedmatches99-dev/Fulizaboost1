import React, { useState, useEffect } from "react";
import "../styles/Admi.css";

// Sample API calls (replace with your backend endpoints)
const fetchPaidBoosts = async (startDate?: string, endDate?: string) => {
  let url = "http://localhost:8080/api/boosts/paid";
  if (startDate && endDate) {
    url = `http://localhost:8080/api/boosts/paid/filter?startDate=${startDate}&endDate=${endDate}`;
  }
  const res = await fetch(url);
  return res.json();
};

const AdminDashboard: React.FC = () => {
  const [boosts, setBoosts] = useState<any[]>([]);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [customerCount, setCustomerCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ startDate: "", endDate: "" });

  const loadData = async () => {
    setLoading(true);
    const allBoosts = await fetchPaidBoosts();
    setBoosts(allBoosts);
    setTotalFees(allBoosts.reduce((sum: number, b: any) => sum + b.fee, 0));
    setCustomerCount(allBoosts.length);
    setLoading(false);
  };

  const applyDateFilter = async () => {
    if (!filter.startDate || !filter.endDate) return;
    setLoading(true);
    const filtered = await fetchPaidBoosts(filter.startDate, filter.endDate);
    setBoosts(filtered);
    setTotalFees(filtered.reduce((sum: number, b: any) => sum + b.fee, 0));
    setCustomerCount(filtered.length);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">FulizaBoost Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="cards">
        <div className="card">
          <p>Total Fees Collected</p>
          <h2>Ksh {totalFees}</h2>
        </div>
        <div className="card">
          <p>Total Customers Paid</p>
          <h2>{customerCount}</h2>
        </div>
        <div className="card">
          <p>Filter by Date</p>
          <input
            type="date"
            value={filter.startDate}
            onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
          />
          <input
            type="date"
            value={filter.endDate}
            onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
          />
          <button onClick={applyDateFilter}>Apply</button>
        </div>
      </div>

      {/* Fee Chart */}
      <div className="chart">
        <h3>Fees per Customer</h3>
        <div className="bar-chart">
          {boosts.map((b) => (
            <div key={b.id} className="bar-container">
              <div
                className="bar"
                style={{ height: `${(b.fee / totalFees) * 100}%` }}
                title={`Ksh ${b.fee}`}
              ></div>
              <span className="bar-label">{b.identificationNumber}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Boosts Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID Number</th>
              <th>Amount</th>
              <th>Fee</th>
              <th>Payment Date</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {boosts.map((b) => (
              <tr key={b.id}>
                <td>{b.identificationNumber}</td>
                <td>{b.amount}</td>
                <td>{b.fee}</td>
                <td>{b.paymentDate ? new Date(b.paymentDate).toLocaleString() : "-"}</td>
                <td>{b.externalReference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
