import { useEffect, useState } from "react";
import { AlertTriangle, Boxes, CalendarClock, CheckCircle2, ShoppingCart } from "lucide-react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import api from "../services/api";
import StatCard from "../components/StatCard";
import AlertPanel from "../components/AlertPanel";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    try {
      const res = await api.get("/dashboard/summary");
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load dashboard.");
    }
  };

  useEffect(() => { fetchSummary(); }, []);

  if (error) return <div className="error-box">{error}</div>;
  if (!data) return <div className="loading">Loading dashboard...</div>;

  const { summary } = data;

  return (
    <main className="page">
      <div className="page-header">
        <div><span className="eyebrow">Smart dashboard</span><h1>Inventory Overview</h1></div>
        <p>Track stock health, expiry risk, and auto-generated shopping list.</p>
      </div>

      <section className="stats-grid">
        <StatCard title="Total Items" value={summary.totalItems} icon={<Boxes />} />
        <StatCard title="Low Stock" value={summary.lowStockCount} icon={<AlertTriangle />} tone="danger-bg" />
        <StatCard title="Expiring Soon" value={summary.expiringSoonCount} icon={<CalendarClock />} tone="warn-bg" />
        <StatCard title="Total Quantity" value={summary.totalQuantity} icon={<CheckCircle2 />} tone="safe-bg" />
      </section>

      <section className="dashboard-grid">
        <div className="panel chart-panel">
          <div className="panel-title"><h3>Category Distribution</h3><span>{data.categoryData.length}</span></div>
          {data.categoryData.length ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={data.categoryData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} label>
                  {data.categoryData.map((_entry, index) => <Cell key={index} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="muted">No category data yet.</p>}
        </div>
        <div className="panel shopping-panel">
          <div className="panel-title"><h3><ShoppingCart size={20} /> Auto Shopping List</h3><span>{data.shoppingList.length}</span></div>
          {!data.shoppingList.length ? <p className="muted">No shopping required. Stock looks good.</p> : data.shoppingList.map((item) => (
            <div className="shopping-row" key={item._id}>
              <strong>{item.name}</strong><span>Buy {item.needed} {item.unit}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-grid">
        <AlertPanel title="Low Stock Alerts" items={data.lowStockItems} emptyText="No low stock items." type="danger" />
        <AlertPanel title="Expiry Soon Alerts" items={data.expiringSoonItems} emptyText="No items expiring soon." type="warn" />
      </section>
    </main>
  );
};

export default Dashboard;
