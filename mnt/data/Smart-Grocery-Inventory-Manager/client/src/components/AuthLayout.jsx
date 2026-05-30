import { ShoppingBasket, Sparkles, ShieldCheck, BarChart3 } from 'lucide-react';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="auth-page">
      <section className="auth-hero glass-card">
        <div className="brand-pill"><ShoppingBasket size={20} /> Smart Grocery OS</div>
        <h1>Plan groceries, prevent waste, and track inventory beautifully.</h1>
        <p>Perfect proof-of-work project for MERN, REST APIs, JWT auth, MongoDB dashboards, and real business workflows.</p>
        <div className="hero-grid">
          <span><Sparkles /> Premium UI</span>
          <span><ShieldCheck /> JWT Secure</span>
          <span><BarChart3 /> Live Analytics</span>
        </div>
      </section>
      <section className="auth-card glass-card">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {children}
      </section>
    </main>
  );
}
