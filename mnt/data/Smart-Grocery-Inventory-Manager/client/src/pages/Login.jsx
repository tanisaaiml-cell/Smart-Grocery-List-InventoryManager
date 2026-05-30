import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Login to manage your smart kitchen inventory.">
      <form onSubmit={submitHandler} className="stack-form">
        {error && <div className="error-box">{error}</div>}
        <label>Email<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="demo@example.com" required /></label>
        <label>Password<input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" placeholder="123456" required /></label>
        <button className="primary-btn" type="submit">Login</button>
      </form>
      <p className="switch-text">New user? <Link to="/register">Create account</Link></p>
    </AuthLayout>
  );
}
