export default function StatCard({ icon: Icon, label, value, note }) {
  return (
    <article className="stat-card glass-card">
      <div className="stat-icon"><Icon size={21} /></div>
      <div>
        <p>{label}</p>
        <h3>{value}</h3>
        <span>{note}</span>
      </div>
    </article>
  );
}
