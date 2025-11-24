import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Icon } from "@iconify/react";
import useTheme from "../hooks/useTheme";

export default function Navbar({ onSearch, onFilter, onSort, filters, sortType }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedDate] = useState(new Date());
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={`navbar flex flex-col w-full 
      rounded-lg rounded-b-none 
      ${!isDark && "bg-brand text-white"} 
      px-[clamp(1rem,3vw,2rem)] py-[clamp(1rem,2vw,1.5rem)] gap-4`}>

      {/* TOP ROW */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-5">

        {/* USER */}
        <div className="flex items-center w-full sm:w-auto">
          <img
            src={user?.profilePic || "/default-avatar.png"}
            alt="profile"
            className="w-20 h-20 rounded-full border-2 border-white object-cover"
          />
          <div className="ml-4">
            <p className="text-sm">Hello,</p>
            <p className="text-lg font-semibold">{user?.name || "User"}</p>
          </div>
        </div>

        {/* SEARCH + CALENDAR */}
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">

          <div className="relative w-[clamp(180px,25vw,250px)]">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearch(e.target.value)}
              className="bg-white/15 text-white placeholder-white/70 border border-white/20 rounded-lg w-full px-3 py-2"
            />
            <Icon icon="ic:baseline-search" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80" />
          </div>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/90">
            <FaCalendarAlt />
            <span>{selectedDate.toDateString().slice(0, 10)}</span>
          </button>
        </div>
      </div>

      {/* FILTER ROW */}
      <div className="flex flex-wrap justify-end items-end gap-4 text-sm">

        {/* STATUS */}
        <div className="flex flex-col">
          <label className="text-xs text-white/70 mb-1">Status</label>
          <select
            value={filters.status || ""}
            onChange={(e) => onFilter("status", e.target.value)}
            className="bg-white text-[#4a4a7d] rounded-lg px-3 py-2 shadow-sm"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* PRIORITY */}
        <div className="flex flex-col">
          <label className="text-xs text-white/70 mb-1">Priority</label>
          <select
            value={filters.priority || ""}
            onChange={(e) => onFilter("priority", e.target.value)}
            className="bg-white text-[#4a4a7d] rounded-lg px-3 py-2 shadow-sm"
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* SORT */}
        <div className="flex flex-col">
          <label className="text-xs text-white/70 mb-1">Sort</label>
          <select
            value={sortType}
            onChange={(e) => onSort(e.target.value)}
            className="bg-white text-[#4a4a7d] rounded-lg px-3 py-2 shadow-sm"
          >
            <option value="">Default</option>
            <option value="dateDesc">Newest</option>
            <option value="dateAsc">Oldest</option>
            <option value="priority">Priority</option>
          </select>
        </div>

      </div>
    </div>
  );
}
