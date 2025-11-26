import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Icon } from "@iconify/react";
import useTheme from "../hooks/useTheme";

export default function Navbar({
  onSearch,
  onFilter,
  onSort,
  filters,
  sortType,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedDate] = useState(new Date());
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className={`
        w-full rounded-lg rounded-b-none 
        px-4 py-5 sm:px-8 sm:py-6 
        flex flex-col gap-6
        ${isDark ? "bg-transparent text-white" : "bg-brand text-white"}
      `}
    >
      {/* ========== TOP SECTION ========== */}
      <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-center sm:justify-between gap-4">
        {/* USER INFO */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <img
            src={user?.profilePic || "/default-avatar.png"}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white object-cover"
          />
          <div>
            <p className="text-sm opacity-70">Hello,</p>
            <p className="text-lg font-semibold">{user?.name || "User"}</p>
          </div>
        </div>
      </div>

      {/* ========== SEARCH FIELD ========== */}
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className={`
            w-full px-3 py-2 rounded-lg border
            ${
              isDark
                ? "bg-white/10 border-white/20 text-white placeholder-white/60"
                : "bg-white text-gray-700 border-gray-300 placeholder-gray-500"
            }
          `}
        />
        <Icon
          icon="ic:baseline-search"
          className={`
            absolute right-3 top-1/2 -translate-y-1/2
            ${isDark ? "text-white/70" : "text-gray-500"}
          `}
        />
      </div>

      {/* ========== DATE BUTTON ========== */}
      <button
        className={`
          w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg 
          ${isDark ? "bg-white/10 text-white" : "bg-white text-gray-700"}
        `}
      >
        <FaCalendarAlt />
        <span>{selectedDate.toDateString().slice(0, 10)}</span>
      </button>

      {/* ========== FILTER GRID ========== */}
      <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 text-sm mt-2">
        {/* STATUS FILTER */}
        <div className="flex flex-col">
          <label className="text-xs opacity-70">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilter("status", e.target.value)}
            className={`px-3 py-2 rounded-lg shadow-sm border 
    ${
      isDark
        ? "bg-[#181a20] text-gray-200 border-[#2a2d3a]"
        : "bg-white text-gray-700 border-gray-300"
    }
  `}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* PRIORITY FILTER */}
        <div className="flex flex-col">
          <label className="text-xs opacity-70">Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => onFilter("priority", e.target.value)}
            className={`px-3 py-2 rounded-lg shadow-sm border 
    ${
      isDark
        ? "bg-[#181a20] text-gray-200 border-[#2a2d3a]"
        : "bg-white text-gray-700 border-gray-300"
    }
  `}
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* SORT */}
        <div className="flex flex-col">
          <label className="text-xs opacity-70">Sort</label>
          <select
            value={sortType}
            onChange={(e) => onSort(e.target.value)}
            className={`px-3 py-2 rounded-lg shadow-sm border 
    ${
      isDark
        ? "bg-[#181a20] text-gray-200 border-[#2a2d3a]"
        : "bg-white text-gray-700 border-gray-300"
    }
  `}
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
