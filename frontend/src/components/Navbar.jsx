import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, setDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.div initial={{ opacity: 90, scale: 0.98 }} animate={{ opacity: 90, scale: 1 }}
                exit={{ opacity: 90, scale: 0.98 }} transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.15 }}>
    <header className="bg-white dark:bg-black/90 border-b border-slate-200 dark:border-gray-700 
            sticky top-0 z-10 shadow-sm hover:shadow-md transition">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/dashboard" className="text-xl font-bold text-emerald-600 dark:text-emerald-400 hover:scale-[1.03]">
          TrackHire
        </Link>

        {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text- text-black dark:text-white">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
             `relative px-2 py-1 transition-all duration-200 hover:text-emerald-400 dark:hover:text-emerald-300/50 sctive:scale-95 hover:scale-[1.03]
             ${
                isActive
                   ? "text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-900/20 dark:bg-emerald-300/20 rounded hover:scale-[1.03]"
                   : "text-gray-600 dark:text-gray-300 hover:text-emerald-500 "
              }`
            }
           >
           Dashboard
           <span
              className={`
                absolute left-0 -bottom-1 h-[2px] w-full 
                bg-emerald-500 
                scale-x-0 origin-left 
                transition-transform duration-300
                group-hover:scale-x-100 
            `}/>
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
             `relative px-2 py-1 transition-all duration-200 hover:text-emerald-400 dark:hover:text-emerald-300/50 hover:scale-[1.03]
             ${
                isActive
                   ? "text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-900/20 dark:bg-emerald-300/20 rounded hover:scale-[1.03]"
                   : "text-gray-600 dark:text-gray-300 hover:text-emerald-500 "
              }`
            }
           >
           Jobs
           <span
              className={`
                absolute left-0 -bottom-1 h-[2px] w-full 
                bg-emerald-500 
                scale-x-0 origin-left 
                transition-transform duration-300
                group-hover:scale-x-100 
            `}/>
          </NavLink>
          <NavLink
            to="/tracker"
            className={({ isActive }) =>
             `relative px-2 py-1 transition-all duration-200 hover:text-emerald-400 dark:hover:text-emerald-300/50 hover:scale-[1.03]
             ${
                isActive
                   ? "text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-900/20 dark:bg-emerald-300/20 rounded hover:scale-[1.03]"
                   : "text-gray-600 dark:text-gray-300 hover:text-emerald-500 "
              }`
            }
           >
           Tracker
           <span
              className={`
                absolute left-0 -bottom-1 h-[2px] w-full 
                bg-emerald-500 
                scale-x-0 origin-left 
                transition-transform duration-300
                group-hover:scale-x-100 
            `}/>
          </NavLink>
          <button onClick={() => setDark(!dark)}>
                {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user && <span className="text-slate-500 text-emerald-800 dark:text-emerald-300/60 hover:scale-[1.02]">{user.name}</span>}
          <button
            className="bg-red-700/80 backdrop-blur-sm text-white px-3 py-1.5 rounded"
            onClick={logout}
          >
            <LogOut size={18}/>
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-emerald-600 dark:text-emerald-400 hover:scale-[1.03]"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed backdrop-blur-sm absolute right-4 top-16 w-64 rounded-xl shadow-sm py-4 px-4 pb-4 flex flex-col gap-3 
             text-sm font-bold text-black dark:text-black bg-emerald-100/50 dark:bg-emerald-700/50 transition-all duration-300 hover:shadow-md">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
             `relative px-2 py-1 transition-all text-black font-bold dark:text-black duration-200 hover:text-emerald-400 
              dark:hover:text-red-100 sctive:scale-95 hover:scale-[1.03]
             ${
                isActive
                   ? "text-emerald-600 font-bold dark:text-emerald-400 font-medium bg-emerald-900/20 dark:bg-emerald-900/20 rounded hover:scale-[1.03]"
                   : "text-gray-600 dark:text-gray-300 hover:text-emerald-500 "
              }`
            }
           >
           Dashboard
           <span
              className={`
                absolute left-0 -bottom-1 h-[2px] w-full 
                bg-emerald-500 
                scale-x-0 origin-left 
                transition-transform duration-300
                group-hover:scale-x-100 
            `}/>
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
             `relative px-2 py-1 transition-all text-black dark:text-black duration-200 hover:text-emerald-400
              dark:hover:text-red-100 hover:scale-[1.03]
             ${
                isActive
                   ? "text-emerald-600 font-bold dark:text-emerald-400 font-medium bg-emerald-900/20 dark:bg-emerald-900/20 rounded hover:scale-[1.03]"
                   : "text-gray-600 dark:text-gray-300 hover:text-emerald-500 "
              }`
            }
           >
           Jobs
           <span
              className={`
                absolute left-0 -bottom-1 h-[2px] w-full 
                bg-emerald-500 
                scale-x-0 origin-left 
                transition-transform duration-300
                group-hover:scale-x-100 
            `}/>
          </NavLink>
          <NavLink
            to="/tracker"
            className={({ isActive }) =>
             `relative px-2 py-1 transition-all font-bold text-black dark:text-black duration-200 hover:text-emerald-400  hover:scale-[1.03]
             ${
                isActive
                   ? "text-emerald-600 font-bold dark:text-emerald-400 font-medium bg-emerald-900/20 dark:bg-emerald-900/20 rounded hover:scale-[1.03]"
                   : "text-gray-600 dark:text-gray-300 hover:text-emerald-500 "
              }`
            }
           >
           Tracker
           <span
              className={`
                absolute left-0 -bottom-1 h-[2px] w-full 
                bg-emerald-500 
                scale-x-0 origin-left 
                transition-transform duration-300
                group-hover:scale-x-100 
            `}/>
          </NavLink>
          <button
             onClick={() => setDark(!dark)}
             className=" px-3 py-1.5 rounded text-emerald-900 dark:text-emerald-800 bg-emerald-900/20 dark:bg-emerald-900/20 rounded hover:scale-[1.03]"
          >
         {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user && <span className="text-slate-500 text-emerald-900 dark:text-emerald-900  ">{user.name}</span>}
          
          <button
            className="bg-red-700/80 backdrop-blur-sm text-white px-3 py-1.5 rounded"
            onClick={logout}
          >
            <LogOut size={18}/> 
          </button>
        </div>
      )}
    </header>
    </motion.div>
  );
}