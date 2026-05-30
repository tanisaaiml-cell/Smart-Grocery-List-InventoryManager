import { Link, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, PackagePlus, ShoppingBasket } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">🥬</span>
        SmartGrocer
      </Link>
      {user && (
        <div className="nav-links">
          <NavLink to="/dashboard"><LayoutDashboard size={18} /> Dashboard</NavLink>
          <NavLink to="/inventory"><ShoppingBasket size={18} /> Inventory</NavLink>
          <NavLink to="/add"><PackagePlus size={18} /> Add Item</NavLink>
          <button onClick={handleLogout} className="ghost-btn"><LogOut size={18} /> Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
