import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form onSubmit={submit} className="bg-white border rounded-xl p-6 w-full max-w-md space-y-3">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <input className="w-full border rounded px-3 py-2" placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Password (min 8)" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">{loading ? "Creating..." : "Register"}</button>
        <p className="text-sm">Have account? <Link className="text-blue-600" to="/login">Login</Link></p>
      </form>
    </div>
  );
}
