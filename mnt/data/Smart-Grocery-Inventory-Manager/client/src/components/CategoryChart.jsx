import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export default function CategoryChart({ summary }) {
  const data = Object.entries(summary || {}).map(([name, value]) => ({ name, value }));
  return (
    <section className="glass-card chart-card">
      <div className="section-head compact"><div><p>Analytics</p><h2>Category Stock Split</h2></div></div>
      {data.length ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
              {data.map((entry, index) => <Cell key={`cell-${index}`} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : <div className="empty-chart">Add grocery items to see analytics.</div>}
    </section>
  );
}
