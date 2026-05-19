import React, { useEffect, useState } from "react";
import Sidebar from "../admin/Sidebar.jsx";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, ResponsiveContainer
} from "recharts";
import { getUsers, getOrders, getProducts } from "../api/api.js";

const LOW_STOCK_THRESHOLD = 10;

const Dahboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    periodUsers: 0,
    pregnancyUsers: 0,
  });
  const [orderChartData, setOrderChartData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const usersRes = await getUsers();
      const ordersRes = await getOrders();
      const productsRes = await getProducts();

      const users = usersRes.data;
      const orders = ordersRes.data.data || [];
      const products = productsRes.data;

      setStats({
        totalUsers: users.length,
        periodUsers: users.filter(u => u.trackerType === "period").length,
        pregnancyUsers: users.filter(u => u.trackerType === "pregnancy").length,
      });

      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const ordersByMonth = months.map((m, i) => {
        const monthOrders = orders.filter(
          o => o.createdAt && new Date(o.createdAt).getMonth() === i
        );
        return { month: m, orders: monthOrders.length };
      });
      setOrderChartData(ordersByMonth);

      const sorted = [...orders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentOrders(sorted.slice(0, 5));

      const approvedOrders = orders.filter(o => o.status === "Approved");
      const productMap = {};
      approvedOrders.forEach(order => {
        order.items?.forEach(item => {
          const product = products.find(p => p.name === item.name);
          if (productMap[item.name]) {
            productMap[item.name].sold += item.quantity;
          } else {
            productMap[item.name] = {
              name: item.name,
              shortName: item.name.length > 12 ? item.name.slice(0, 12) + "…" : item.name,
              stock: product?.stock ?? 0,
              sold: item.quantity,
            };
          }
        });
      });

      setProductData(Object.values(productMap));
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar active="Dashboard" />
      <div className="flex-1 p-4 md:p-8 bg-gray-100 w-full">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Top Metrics — 3 cards, NO revenue */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6">
          <MetricCard title="Total Users" value={stats.totalUsers} />
          <MetricCard title="Period Tracker Users" value={stats.periodUsers} />
          <MetricCard title="Pregnancy Tracker Users" value={stats.pregnancyUsers} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          {/* Orders Line Chart */}
          <Card title="Orders Over Time">
            <div className="w-full" style={{ height: 380 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={false} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#ec4899"
                    name="Orders"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Products Bar Chart — full height, scrollable, NO text below */}
          <Card title="Approved Products Sold">
            {productData.length === 0 ? (
              <div className="flex items-center justify-center" style={{ height: 380 }}>
                <p className="text-gray-400 text-sm">No approved orders yet.</p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto" style={{ height: 380 }}>
                <div
                  style={{
                    width: Math.max(productData.length * 80, 400),
                    height: 380,
                  }}
                >
                  <BarChart
                    width={Math.max(productData.length * 80, 400)}
                    height={380}
                    data={productData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="shortName"
                      tick={{ fontSize: 12 }}
                      angle={-35}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                      cursor={false}
                      formatter={(value, name, props) => [value, props.payload.name]}
                    />
                    <Bar
                      dataKey="sold"
                      fill="#e08594"
                      radius={[5, 5, 0, 0]}
                      name="Qty Sold"
                    />
                  </BarChart>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Recent Orders Table */}
        <Card title="Recent Orders">
          {recentOrders.length === 0 ? (
            <p className="text-gray-400 text-sm">No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-200">
                    <th className="pb-2 font-medium">Customer</th>
                    <th className="pb-2 font-medium">Items</th>
                    <th className="pb-2 font-medium">Total</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 text-gray-700">
                        <div className="font-medium">
                          {order.shippingDetails?.fullName || "N/A"}
                        </div>
                        <div className="text-xs text-gray-400">
                          {order.shippingDetails?.phone || ""}
                        </div>
                      </td>
                      <td className="py-2 text-gray-500">
                        {order.items?.length
                          ? order.items.map((item, i) => (
                              <div key={i} className="text-xs">
                                {item.name} × {item.quantity}
                              </div>
                            ))
                          : "—"}
                      </td>
                      <td className="py-2 text-gray-700 font-medium">
                        ₹{order.total ?? "—"}
                      </td>
                      <td className="py-2">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-2 text-gray-400 text-xs">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Product Stock Overview */}
        <Card title="Product Stock Overview">
          {productData.length === 0 ? (
            <p className="text-gray-400 text-sm">No product data.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productData.map(product => {
                const isLow = product.stock < LOW_STOCK_THRESHOLD;
                return (
                  <div
                    key={product.name}
                    className={`p-3 rounded-lg shadow border ${
                      isLow ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-700 text-sm truncate">
                        {product.name}
                      </p>
                      {isLow && (
                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full ml-1 shrink-0">
                          Low
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${isLow ? "text-red-500 font-semibold" : "text-gray-500"}`}>
                      Stock: {product.stock}
                    </p>
                    <p className="text-xs text-gray-400">Sold: {product.sold}</p>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

      </div>
    </div>
  );
};

const MetricCard = ({ title, value }) => (
  <div className="bg-white p-4 md:p-6 rounded-3xl shadow border border-gray-200 text-center">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const Card = ({ title, children }) => (
  <div className="bg-white p-4 md:p-6 rounded-3xl shadow border border-gray-200 mb-6">
    <h3 className="text-gray-700 font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

const StatusBadge = ({ status }) => {
  const colors = {
    Delivered:  "bg-green-100 text-green-700",
    Shipped:    "bg-blue-100 text-blue-700",
    Pending:    "bg-yellow-100 text-yellow-700",
    Processing: "bg-purple-100 text-purple-700",
    Cancelled:  "bg-red-100 text-red-700",
    Approved:   "bg-green-100 text-green-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors["Pending"]}`}>
      {status || "Pending"}
    </span>
  );
};

export default Dahboard;