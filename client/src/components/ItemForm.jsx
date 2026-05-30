import { useState } from "react";

const categories = ["Grains", "Dairy", "Bakery", "Vegetables", "Fruits", "Snacks", "Beverages", "Household", "Other"];
const units = ["kg", "g", "l", "ml", "pcs", "packets", "bottles"];

const initialState = {
  name: "",
  category: "Other",
  quantity: 1,
  unit: "pcs",
  minStock: 1,
  expiryDate: "",
  notes: "",
};

const ItemForm = ({ initialValues, onSubmit, loading }) => {
  const [form, setForm] = useState(initialValues || initialState);

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      quantity: Number(form.quantity),
      minStock: Number(form.minStock),
    });
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="form-grid">
        <label>Item Name<input name="name" value={form.name} onChange={updateField} placeholder="Rice, Milk, Eggs" required /></label>
        <label>Category<select name="category" value={form.category} onChange={updateField}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>Quantity<input type="number" step="0.1" min="0" name="quantity" value={form.quantity} onChange={updateField} required /></label>
        <label>Unit<select name="unit" value={form.unit} onChange={updateField}>{units.map((u) => <option key={u}>{u}</option>)}</select></label>
        <label>Minimum Stock<input type="number" step="0.1" min="0" name="minStock" value={form.minStock} onChange={updateField} required /></label>
        <label>Expiry Date<input type="date" name="expiryDate" value={form.expiryDate?.slice(0, 10)} onChange={updateField} required /></label>
      </div>
      <label>Notes<textarea name="notes" value={form.notes} onChange={updateField} placeholder="Example: buy fresh, preferred brand, storage note" /></label>
      <button className="primary-btn" disabled={loading}>{loading ? "Saving..." : "Save Grocery Item"}</button>
    </form>
  );
};

export default ItemForm;
