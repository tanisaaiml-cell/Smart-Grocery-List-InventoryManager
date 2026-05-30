const StatCard = ({ title, value, icon, tone }) => (
  <div className={`stat-card ${tone || ""}`}>
    <div className="stat-icon">{icon}</div>
    <div>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  </div>
);

export default StatCard;
