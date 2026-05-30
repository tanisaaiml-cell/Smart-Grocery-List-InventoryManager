import { Edit3, Minus, Plus, Trash2 } from "lucide-react";

const InventoryTable = ({ items, onEdit, onDelete, onAdjust }) => {
  if (!items.length) return <div className="empty-state">No items found. Add your first grocery item.</div>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Item</th><th>Category</th><th>Stock</th><th>Min</th><th>Expiry</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isLow = item.quantity <= item.minStock;
            const daysLeft = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
            return (
              <tr key={item._id}>
                <td><strong>{item.name}</strong><p>{item.notes}</p></td>
                <td>{item.category}</td>
                <td>{item.quantity} {item.unit}</td>
                <td>{item.minStock} {item.unit}</td>
                <td>{new Date(item.expiryDate).toLocaleDateString()}<p>{daysLeft < 0 ? "Expired" : `${daysLeft} days left`}</p></td>
                <td><span className={`pill ${isLow ? "danger" : daysLeft <= 7 ? "warn" : "safe"}`}>{isLow ? "Low Stock" : daysLeft <= 7 ? "Expiring" : "Good"}</span></td>
                <td className="actions">
                  <button onClick={() => onAdjust(item._id, "decrease")}><Minus size={16} /></button>
                  <button onClick={() => onAdjust(item._id, "increase")}><Plus size={16} /></button>
                  <button onClick={() => onEdit(item)}><Edit3 size={16} /></button>
                  <button onClick={() => onDelete(item._id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
