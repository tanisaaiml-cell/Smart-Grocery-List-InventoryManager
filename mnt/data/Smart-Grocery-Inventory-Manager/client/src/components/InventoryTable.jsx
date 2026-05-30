import { Edit3, Minus, Plus, Trash2 } from 'lucide-react';

const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : 'No date');

export default function InventoryTable({ items, onEdit, onDelete, onAdjust }) {
  return (
    <section className="inventory-card glass-card">
      <div className="section-head compact"><div><p>Live Stock</p><h2>Inventory List</h2></div></div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Item</th><th>Category</th><th>Stock</th><th>Expiry</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const low = item.quantity <= item.minStock;
              return (
                <tr key={item._id}>
                  <td><strong>{item.name}</strong><span>{item.location}</span></td>
                  <td><span className="tag">{item.category}</span></td>
                  <td>{item.quantity} {item.unit}<small> Min: {item.minStock}</small></td>
                  <td>{formatDate(item.expiryDate)}</td>
                  <td><span className={low ? 'badge danger' : 'badge success'}>{low ? 'Low Stock' : 'Healthy'}</span></td>
                  <td className="action-row">
                    <button onClick={() => onAdjust(item._id, -1)}><Minus size={15} /></button>
                    <button onClick={() => onAdjust(item._id, 1)}><Plus size={15} /></button>
                    <button onClick={() => onEdit(item)}><Edit3 size={15} /></button>
                    <button className="danger-btn" onClick={() => onDelete(item._id)}><Trash2 size={15} /></button>
                  </td>
                </tr>
              );
            })}
            {!items.length && <tr><td colSpan="6" className="empty-cell">No grocery items found. Add your first item from the form.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
