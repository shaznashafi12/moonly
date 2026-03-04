import React from "react";
import Sidebar from "../admin/Sidebar.jsx";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer
} from "recharts";

// Sample data
const dashboardData = {
  totalUsers: 1200,
  periodUsers: 800,
  pregnancyUsers: 400,
  productsPurchased: 650,
  sessions: [
    { month: "Jan", users: 100, periodUsers: 70, pregnancyUsers: 30, products: 50 },
    { month: "Feb", users: 150, periodUsers: 90, pregnancyUsers: 60, products: 70 },
    { month: "Mar", users: 200, periodUsers: 120, pregnancyUsers: 80, products: 90 },
    { month: "Apr", users: 180, periodUsers: 100, pregnancyUsers: 80, products: 85 },
    { month: "May", users: 250, periodUsers: 160, pregnancyUsers: 90, products: 120 },
    { month: "Jun", users: 300, periodUsers: 200, pregnancyUsers: 100, products: 130 },
  ]
};

const Dahboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar active="Dashboard" />

      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
          <MetricCard title="Total Users" value={dashboardData.totalUsers} />
          <MetricCard title="Period Tracker Users" value={dashboardData.periodUsers} />
          <MetricCard title="Pregnancy Users" value={dashboardData.pregnancyUsers} />
          <MetricCard title="Products Purchased" value={dashboardData.productsPurchased} />
        </div>

        {/* Sessions by category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card title="Users Over Time">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dashboardData.sessions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#ec4899" />
                <Line type="monotone" dataKey="periodUsers" stroke="#f472b6" />
                <Line type="monotone" dataKey="pregnancyUsers" stroke="#a78bfa" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

        <Card title="Products Purchased Over Time">
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={dashboardData.sessions}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip cursor={{ fill: "transparent" }} /> {/* <-- removes gray hover */}
      <Bar dataKey="products" fill="#e08594" radius={[5,5,0,0]} />
    </BarChart>
  </ResponsiveContainer>
</Card>

        </div>

        {/* Additional device stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Device Sessions">
            <ResponsiveContainer width="100%" height={120}>
              <BarChart layout="vertical" data={[
                { name: "Desktop", value: 600 },
                { name: "Mobile", value: 400 },
                { name: "Tablet", value: 200 },
              ]}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" />
                <Bar dataKey="value" fill="#e08594" radius={[5,5,5,5]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Top Purchased Products">
            <ul className="text-sm space-y-2">
              <li>Organic Pads – 150</li>
              <li>Pregnancy Starter Kit – 120</li>
              <li>Vitamin Supplements – 100</li>
              <li>Baby Clothes – 80</li>
            </ul>
          </Card>

          <Card title="Upcoming Reminders">
            <ul className="text-sm space-y-2">
              <li>Review blood report – 5 users</li>
              <li>Check pregnancy scan – 3 users</li>
              <li>Follow-up consultation – 2 users</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-white p-4 rounded-3xl shadow border border-gray-200">
    <h3 className="text-gray-700 font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const MetricCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-3xl shadow border border-gray-200 text-center">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default Dahboard;
