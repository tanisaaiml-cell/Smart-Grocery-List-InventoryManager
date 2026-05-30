import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import api from "../services/api";

const AddItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createItem = async (payload) => {
    setLoading(true);
    setError("");
    try {
      await api.post("/groceries", payload);
      navigate("/inventory");
    } catch (err) {
      setError(err.response?.data?.message || "Could not add item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page narrow-page">
      <div className="page-header"><div><span className="eyebrow">Add stock</span><h1>Add Grocery Item</h1></div></div>
      {error && <div className="error-box">{error}</div>}
      <ItemForm onSubmit={createItem} loading={loading} />
    </main>
  );
};

export default AddItem;
