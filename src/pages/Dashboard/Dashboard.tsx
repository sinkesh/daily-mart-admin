import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 400, orders: 240 },
  { month: "Feb", sales: 300, orders: 180 },
  { month: "Mar", sales: 500, orders: 350 },
  { month: "Apr", sales: 700, orders: 420 },
  { month: "May", sales: 600, orders: 300 },
  { month: "Jun", sales: 750, orders: 380 },
  { month: "Jul", sales: 820, orders: 420 },
  { month: "Aug", sales: 760, orders: 390 },
  { month: "Sep", sales: 900, orders: 460 },
  { month: "Oct", sales: 850, orders: 430 },
  { month: "Nov", sales: 780, orders: 410 },
  { month: "Dec", sales: 950, orders: 500 },
];


const countrySessions = [
  { name: "India", value: 55 },
  { name: "USA", value: 20 },
  { name: "UK", value: 10 },
  { name: "Canada", value: 8 },
  { name: "Germany", value: 7 },
];

const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#06b6d4", "#ef4444"];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">

      {/* Cards Section */}
      <div className="cards">
        <div className="card card-1">
          <h2>Total Users</h2>
          <p>1200</p>
        </div>
        <div className="card card-2">
          <h2>Total Orders</h2>
          <p>350</p>
        </div>
        <div className="card card-3">
          <h2>Revenue</h2>
          <p>$25k</p>
        </div>
        <div className="card card-4">
          <h2>Pending Orders</h2>
          <p>18</p>
        </div>
      </div>

      {/* Charts Row 1 */}
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

      {/* Charts Row 3 */}
      <div className="charts">

        {/* Sessions by Country */}
        <div className="chart-box">
          <h3>Sessions by Country</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={countrySessions}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {countrySessions.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Pages */}
        <div className="table-section">
          <h3>Top Pages</h3>

          <table className="top-pages">
            <thead>
              <tr>
                <th>Page</th>
                <th>Visits</th>
                <th>Bounce Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>/home</td>
                <td>12,500</td>
                <td>34%</td>
              </tr>
              <tr>
                <td>/products</td>
                <td>9,600</td>
                <td>28%</td>
              </tr>
              <tr>
                <td>/contact</td>
                <td>3,200</td>
                <td>40%</td>
              </tr>
            </tbody>
          </table>
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
