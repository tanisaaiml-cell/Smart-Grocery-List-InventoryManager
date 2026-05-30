import { AlertTriangle, CalendarClock, ShoppingCart } from 'lucide-react';

export default function AlertPanel({ dashboard }) {
  const sections = [
    { title: 'Low Stock Alerts', icon: AlertTriangle, data: dashboard?.lowStockItems || [], empty: 'No low-stock items.' },
    { title: 'Expiry Soon', icon: CalendarClock, data: dashboard?.expiringSoonItems || [], empty: 'No items expiring soon.' }
  ];

  return (
    <aside className="alert-grid">
      {sections.map((section) => (
        <div className="glass-card mini-panel" key={section.title}>
          <h3><section.icon size={18} /> {section.title}</h3>
          {section.data.slice(0, 5).map((item) => <p key={item._id}><b>{item.name}</b><span>{item.quantity} {item.unit}</span></p>)}
          {!section.data.length && <small>{section.empty}</small>}
        </div>
      ))}
      <div className="glass-card mini-panel shopping-panel">
        <h3><ShoppingCart size={18} /> Auto Shopping List</h3>
        {(dashboard?.shoppingList || []).slice(0, 6).map((item) => <p key={item._id}><b>{item.name}</b><span>Buy {item.suggestedQuantity} {item.unit}</span></p>)}
        {!dashboard?.shoppingList?.length && <small>Shopping list is clear.</small>}
      </div>
    </aside>
  );
}
