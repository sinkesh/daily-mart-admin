import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import "./Dashboard.css";

const salesData = [
  { month: "Jan", sales: 400, orders: 240 },
  { month: "Feb", sales: 300, orders: 180 },
  { month: "Mar", sales: 500, orders: 350 },
  { month: "Apr", sales: 700, orders: 420 },
  { month: "May", sales: 600, orders: 300 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      {/* Page Heading */}
      <h1 className="dashboard-title">📊 Dashboard Overview</h1>

      {/* Top Cards */}
      <div className="cards">
        <div className="card">
          <h2>Total Orders</h2>
          <p>1,245</p>
        </div>
        <div className="card">
          <h2>Total Sales</h2>
          <p>₹ 5,20,000</p>
        </div>
        <div className="card">
          <h2>New Customers</h2>
          <p>320</p>
        </div>
        <div className="card">
          <h2>Pending Orders</h2>
          <p>56</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts">
        <div className="chart-box">
          <h3>Sales Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Orders Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-section">
        <h3>Recent Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1001</td>
              <td>Rahul Sharma</td>
              <td><span className="status success">Completed</span></td>
              <td>₹ 12,500</td>
              <td>05 Sep 2025</td>
            </tr>
            <tr>
              <td>#1002</td>
              <td>Ananya Gupta</td>
              <td><span className="status pending">Pending</span></td>
              <td>₹ 8,200</td>
              <td>04 Sep 2025</td>
            </tr>
            <tr>
              <td>#1003</td>
              <td>Amit Verma</td>
              <td><span className="status cancelled">Cancelled</span></td>
              <td>₹ 3,600</td>
              <td>03 Sep 2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
