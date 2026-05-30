import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthPage = ({ mode }) => {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) await login({ email: form.email, password: form.password });
      else await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-layout">
      <section className="hero-card">
        <span className="eyebrow">Inventory intelligence for daily groceries</span>
        <h1>Track stock, expiry dates, and shopping needs from one premium dashboard.</h1>
        <p>Perfect for students, hostels, families, cloud kitchens, and small grocery shops.</p>
      </section>
      <section className="auth-card">
        <h2>{isLogin ? "Welcome back" : "Create account"}</h2>
        <p>{isLogin ? "Login to manage your grocery inventory." : "Start your smart grocery system."}</p>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={submit}>
          {!isLogin && <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>}
          <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
          <label>Password<input type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
          <button className="primary-btn" disabled={loading}>{loading ? "Please wait..." : isLogin ? "Login" : "Register"}</button>
        </form>
        <p className="switch-text">
          {isLogin ? "New here?" : "Already have an account?"} <Link to={isLogin ? "/register" : "/login"}>{isLogin ? "Register" : "Login"}</Link>
        </p>
        <p className="demo-text">Demo after seed: demo@grocery.com / 123456</p>
      </section>
    </main>
  );
};

export default AuthPage;
