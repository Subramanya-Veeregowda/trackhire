import { useEffect, useState } from "react";
import api from "../api/client";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalApplied: 0, interviews: 0, offers: 0, rejections: 0 });
  const [savedJobs, setSavedJobs] = useState([]);
  const [dailyDigest, setDailyDigest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [d, s, digest] = await Promise.all([
        api.get("/api/dashboard"),
        api.get("/api/saved-jobs"),
        api.get("/api/jobs/daily-digest"),
      ]);
      setStats(d.data);
      setSavedJobs(s.data);
      setDailyDigest(digest.data);
      setLoading(false);
    };
    load();
  }, []);

  return (
     <motion.div initial={{ opacity: 90, scale: 0.98 }} animate={{ opacity: 90, scale: 1 }} exit={{ opacity: 90, scale: 0.98 }} 
             transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.25 }}>
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-semibold text-emerald-500 dark:text-emerald-300 ">Dashboard</h1>
        {loading ? <p>Loading dashboard...</p> : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard label="Total Applied" value={stats.totalApplied} />
              <StatCard label="Interviews" value={stats.interviews} />
              <StatCard label="Offers" value={stats.offers} />
              <StatCard label="Rejections" value={stats.rejections} />
            </div>
            <section className="bg-white border rounded-xl p-4">
              <h2 className="font-semibold">Saved Jobs</h2>
              <ul className="mt-2 text-sm space-y-1">{savedJobs.slice(0, 5).map((j) => <li key={j.id}>{j.title} at {j.company}</li>)}</ul>
            </section>
            <section className="bg-white border rounded-xl p-4">
              <h2 className="font-semibold">Daily Digest (Scheduler)</h2>
              <ul className="mt-2 text-sm space-y-1">{dailyDigest.slice(0, 5).map((j) => <li key={j.externalId}>{j.title} - {j.company}</li>)}</ul>
            </section>
          </>
        )}
      </main>
    </>
    </motion.div>
  );
}
