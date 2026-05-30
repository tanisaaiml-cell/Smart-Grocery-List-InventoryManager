import { useEffect, useState } from 'react';
import { Boxes, CalendarX2, LogOut, PackageCheck, Search, ShoppingBasket, TriangleAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { dashboardAPI, groceryAPI } from '../services/api.js';
import StatCard from '../components/StatCard.jsx';
import ItemForm from '../components/ItemForm.jsx';
import InventoryTable from '../components/InventoryTable.jsx';
import AlertPanel from '../components/AlertPanel.jsx';
import CategoryChart from '../components/CategoryChart.jsx';

const categories = ['All', 'Grains', 'Dairy', 'Bakery', 'Vegetables', 'Fruits', 'Protein', 'Snacks', 'Beverages', 'Household', 'Other'];
const statuses = ['All', 'Low Stock', 'Expiring Soon'];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [filters, setFilters] = useState({ search: '', category: 'All', status: 'All' });
  const [message, setMessage] = useState('');

  const loadData = async () => {
    const [itemsRes, dashboardRes] = await Promise.all([groceryAPI.getAll(filters), dashboardAPI.get()]);
    setItems(itemsRes.data);
    setDashboard(dashboardRes.data);
  };

  useEffect(() => { loadData(); }, [filters.category, filters.status]);

  const searchNow = (e) => { e.preventDefault(); loadData(); };

  const saveItem = async (item) => {
    if (editingItem) await groceryAPI.update(editingItem._id, item);
    else await groceryAPI.create(item);
    setEditingItem(null);
    setMessage(editingItem ? 'Item updated successfully.' : 'Item added successfully.');
    await loadData();
  };

  const deleteItem = async (id) => {
    await groceryAPI.remove(id);
    setMessage('Item deleted.');
    await loadData();
  };

  const adjust = async (id, change) => {
    await groceryAPI.adjustQuantity(id, change);
    await loadData();
  };

  return (
    <main className="dashboard-page">
      <header className="topbar glass-card">
        <div className="logo"><ShoppingBasket /> <span>GroceryFlow</span></div>
        <div className="top-actions"><span>Hi, {user?.name}</span><button onClick={logout}><LogOut size={17} /> Logout</button></div>
      </header>

      <section className="hero glass-card">
        <div>
          <p>Smart Grocery List & Inventory Manager</p>
          <h1>Control stock, expiry dates, and shopping needs from one premium dashboard.</h1>
          <span>Workflow: login → add item → update stock → alerts → shopping list → dashboard</span>
        </div>
      </section>

      {message && <div className="toast" onAnimationEnd={() => setMessage('')}>{message}</div>}

      <section className="stats-grid">
        <StatCard icon={Boxes} label="Total Items" value={dashboard?.totals?.totalItems || 0} note="Unique groceries" />
        <StatCard icon={PackageCheck} label="Total Quantity" value={dashboard?.totals?.totalQuantity || 0} note="Across inventory" />
        <StatCard icon={TriangleAlert} label="Low Stock" value={dashboard?.totals?.lowStock || 0} note="Need attention" />
        <StatCard icon={CalendarX2} label="Expiring Soon" value={dashboard?.totals?.expiringSoon || 0} note="Next 7 days" />
      </section>

      <section className="main-grid">
        <ItemForm onSubmit={saveItem} editingItem={editingItem} onCancel={() => setEditingItem(null)} />
        <AlertPanel dashboard={dashboard} />
      </section>

      <section className="tools-row glass-card">
        <form onSubmit={searchNow} className="search-box"><Search size={18} /><input value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} placeholder="Search grocery item..." /><button>Search</button></form>
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>{statuses.map((s) => <option key={s}>{s}</option>)}</select>
      </section>

      <section className="content-grid">
        <InventoryTable items={items} onEdit={setEditingItem} onDelete={deleteItem} onAdjust={adjust} />
        <CategoryChart summary={dashboard?.categorySummary} />
      </section>
    </main>
  );
}
