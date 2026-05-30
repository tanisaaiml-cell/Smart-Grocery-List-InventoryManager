import { useEffect, useState } from 'react';

const initial = {
  name: '', category: 'Grains', quantity: 1, unit: 'kg', minStock: 1, expiryDate: '', location: 'Kitchen', notes: ''
};
const categories = ['Grains', 'Dairy', 'Bakery', 'Vegetables', 'Fruits', 'Protein', 'Snacks', 'Beverages', 'Household', 'Other'];

export default function ItemForm({ onSubmit, editingItem, onCancel }) {
  const [form, setForm] = useState(initial);

  useEffect(() => {
    if (editingItem) {
      setForm({
        ...editingItem,
        expiryDate: editingItem.expiryDate ? editingItem.expiryDate.slice(0, 10) : ''
      });
    } else setForm(initial);
  }, [editingItem]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, quantity: Number(form.quantity), minStock: Number(form.minStock) });
    setForm(initial);
  };

  return (
    <form className="item-form glass-card" onSubmit={submit}>
      <div className="section-head compact">
        <div><p>Inventory Form</p><h2>{editingItem ? 'Edit grocery item' : 'Add grocery item'}</h2></div>
        {editingItem && <button type="button" className="ghost-btn" onClick={onCancel}>Cancel</button>}
      </div>
      <div className="form-grid">
        <label>Item Name<input name="name" value={form.name} onChange={change} placeholder="Milk, Rice, Eggs..." required /></label>
        <label>Category<select name="category" value={form.category} onChange={change}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>Quantity<input name="quantity" type="number" min="0" value={form.quantity} onChange={change} required /></label>
        <label>Unit<input name="unit" value={form.unit} onChange={change} placeholder="kg / litre / pcs" /></label>
        <label>Minimum Stock<input name="minStock" type="number" min="0" value={form.minStock} onChange={change} /></label>
        <label>Expiry Date<input name="expiryDate" type="date" value={form.expiryDate || ''} onChange={change} /></label>
        <label>Location<input name="location" value={form.location} onChange={change} placeholder="Fridge / Pantry" /></label>
        <label>Notes<input name="notes" value={form.notes} onChange={change} placeholder="Optional note" /></label>
      </div>
      <button className="primary-btn" type="submit">{editingItem ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
}
