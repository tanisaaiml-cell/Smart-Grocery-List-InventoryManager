import { useEffect, useState } from "react";
import api from "../services/api";
import InventoryTable from "../components/InventoryTable";
import ItemForm from "../components/ItemForm";

const categories = ["All", "Grains", "Dairy", "Bakery", "Vegetables", "Fruits", "Snacks", "Beverages", "Household", "Other"];

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ search: "", category: "All", stock: "All" });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      const res = await api.get("/groceries", { params: filters });
      setItems(res.data.items);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch inventory.");
    }
  };

  useEffect(() => { fetchItems(); }, [filters.category, filters.stock]);

  const deleteItem = async (id) => {
    if (!confirm("Delete this item?")) return;
    await api.delete(`/groceries/${id}`);
    fetchItems();
  };

  const adjust = async (id, action) => {
    await api.patch(`/groceries/${id}/quantity`, { action, amount: 1 });
    fetchItems();
  };

  const updateItem = async (payload) => {
    await api.put(`/groceries/${editing._id}`, payload);
    setEditing(null);
    fetchItems();
  };

  return (
    <main className="page">
      <div className="page-header">
        <div><span className="eyebrow">Manage stock</span><h1>Grocery Inventory</h1></div>
        <p>Search, filter, update quantity, edit, and delete grocery stock.</p>
      </div>
      {error && <div className="error-box">{error}</div>}
      <section className="filters">
        <input placeholder="Search item..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} onKeyDown={(e) => e.key === "Enter" && fetchItems()} />
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
        <select value={filters.stock} onChange={(e) => setFilters({ ...filters, stock: e.target.value })}><option>All</option><option>Low</option><option>Good</option></select>
        <button className="primary-btn small" onClick={fetchItems}>Search</button>
      </section>

      {editing && (
        <section className="modal-backdrop">
          <div className="modal-card">
            <div className="panel-title"><h3>Edit Item</h3><button className="ghost-btn" onClick={() => setEditing(null)}>Close</button></div>
            <ItemForm initialValues={{ ...editing, expiryDate: editing.expiryDate?.slice(0, 10) }} onSubmit={updateItem} />
          </div>
        </section>
      )}

      <InventoryTable items={items} onEdit={setEditing} onDelete={deleteItem} onAdjust={adjust} />
    </main>
  );
};

export default Inventory;
