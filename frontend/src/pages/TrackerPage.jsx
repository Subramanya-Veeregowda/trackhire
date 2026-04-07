import { useEffect, useState } from "react";
import api from "../api/client";
import Navbar from "../components/Navbar";

const defaultForm = {
  companyName: "",
  role: "",
  location: "",
  dateApplied: "",
  status: "APPLIED",
  notes: "",
};

export default function TrackerPage() {
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const { data } = await api.get("/api/applications");
    setApps(data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/api/applications/${editingId}`, form);
    } else {
      await api.post("/api/applications", form);
    }
    setForm(defaultForm);
    setEditingId(null);
    load();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm(item);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Application Tracker</h1>
        <form onSubmit={submit} className="bg-white border rounded-xl p-4 grid md:grid-cols-3 gap-2">
          <input className="border rounded px-3 py-2" placeholder="Company name" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} required />
          <input className="border rounded px-3 py-2" placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          <input className="border rounded px-3 py-2" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
          <input className="border rounded px-3 py-2" type="date" value={form.dateApplied} onChange={(e) => setForm({ ...form, dateApplied: e.target.value })} required />
          <select className="border rounded px-3 py-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <input className="border rounded px-3 py-2" placeholder="Notes" value={form.notes || ""} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button className="md:col-span-3 bg-blue-600 text-white rounded px-3 py-2">{editingId ? "Update Application" : "Add Application"}</button>
        </form>

        <div className="overflow-x-auto bg-white border rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-2">Company</th><th className="text-left p-2">Role</th><th className="text-left p-2">Status</th><th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-2">{a.companyName}</td>
                  <td className="p-2">{a.role}</td>
                  <td className="p-2">{a.status}</td>
                  <td className="p-2 space-x-2">
                    <button className="text-blue-600" onClick={() => startEdit(a)}>Edit</button>
                    <button className="text-red-600" onClick={async () => { await api.delete(`/api/applications/${a.id}`); load(); }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
