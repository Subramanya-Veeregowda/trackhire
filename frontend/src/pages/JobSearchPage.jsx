import { useState } from "react";
import api from "../api/client";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function JobSearchPage() {
  const [query, setQuery] = useState({ role: "Java Developer", location: "Remote", experience: "0-2 years" });
  const [jobs, setJobs] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/api/jobs/search", query);
      setJobs(data);
      const h = await api.get("/api/jobs/history");
      setHistory(h.data);
    } catch (err) {
      setError(err.response?.data?.error || "Unable to search jobs");
    } finally {
      setLoading(false);
    }
  };

  const saveJob = async (job) => {
    await api.post("/api/saved-jobs", {
      externalId: job.externalId,
      title: job.title,
      company: job.company,
      location: job.location,
      url: job.applyUrl,
    });
  };

  return (
        <motion.div initial={{ opacity: 90, scale: 0.98 }} animate={{ opacity: 90, scale: 1 }}
                exit={{ opacity: 90, scale: 0.98 }} transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.15 }}>
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-semibold text-emerald-500 dark:text-emerald-300">Job & Internship Search</h1>
        <form onSubmit={search} className="grid md:grid-cols-4 gap-2 bg-white border rounded-xl p-3">
          <input className="border rounded px-3 py-2" value={query.role} onChange={(e) => setQuery({ ...query, role: e.target.value })} placeholder="Role" />
          <input className="border rounded px-3 py-2" value={query.location} onChange={(e) => setQuery({ ...query, location: e.target.value })} placeholder="Location" />
          <input className="border rounded px-3 py-2" value={query.experience} onChange={(e) => setQuery({ ...query, experience: e.target.value })} placeholder="Experience" />
          <button className="bg-blue-600 text-white rounded px-3 py-2">{loading ? "Searching..." : "Search"}</button>
        </form>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="grid md:grid-cols-2 gap-3">
          {jobs.map((job) => <JobCard key={job.externalId + job.title} job={job} onSave={saveJob} />)}
        </div>
        <section className="bg-white border rounded-xl p-4">
          <h2 className="font-semibold">Recent Searches</h2>
          <ul className="text-sm mt-2 space-y-1">
            {history.map((h, idx) => <li key={idx}>{h.role} - {h.location} - {h.experience}</li>)}
          </ul>
        </section>
      </main>
    </>
    </motion.div>
  );
}
