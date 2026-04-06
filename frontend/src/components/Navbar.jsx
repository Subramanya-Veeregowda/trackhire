import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="text-xl font-bold text-blue-600">
          TrackHire
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/jobs">Job Search</Link>
          <Link to="/tracker">Tracker</Link>
          {user && <span className="text-slate-600">{user.name}</span>}
          <button className="bg-slate-900 text-white px-3 py-1.5 rounded" onClick={logout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
