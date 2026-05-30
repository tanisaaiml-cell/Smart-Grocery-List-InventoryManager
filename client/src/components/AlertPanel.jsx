const AlertPanel = ({ title, items, emptyText, type }) => (
  <section className="panel">
    <div className="panel-title">
      <h3>{title}</h3>
      <span>{items?.length || 0}</span>
    </div>
    {!items?.length ? (
      <p className="muted">{emptyText}</p>
    ) : (
      <div className="mini-list">
        {items.slice(0, 5).map((item) => (
          <div className="mini-item" key={item._id}>
            <div>
              <strong>{item.name}</strong>
              <p>{item.category} • {item.quantity} {item.unit}</p>
            </div>
            <span className={`pill ${type}`}>{type === "danger" ? "Low" : "Soon"}</span>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default AlertPanel;
