import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from "@iconify/react";

// Navbar receives props from TaskList (for search, filter, and sort)
export default function Navbar({ onSearch, onFilter, onSort, filters, sortType }) {
  const [selectedDate] = useState(new Date());
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <div className="flex flex-col w-full rounded-lg rounded-b-none bg-brand text-white shadow-md px-[clamp(1rem,3vw,2rem)] py-[clamp(1rem,2vw,1.5rem)] gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-5">

        {/* LOGO */}
        <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
          <img
            src={user?.profilePic || "/default-avatar.png"}
            alt="profile"
            className="w-20 h-20 rounded-full border-2 border-white object-cover"
          />

          <div className="ml-4">
            <p className="text-sm font-medium">Hello,</p>
            <p className="text-lg font-semibold">{user?.name || "User"}</p>
          </div>
        </div>

        {/* SEARCH + CALENDAR */}
        <div className="flex items-center justify-center gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">

          {/* SEARCH INPUT */}
          <div className="relative w-[clamp(180px,25vw,250px)]">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearch(e.target.value)} // Call parent handler
              className="bg-white/15 placeholder-white/80 text-white border border-white/20 rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-0"
            />
            <Icon
              icon="ic:baseline-search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 text-lg"
            />
          </div>

          {/* CALENDAR BUTTON */}
          <button
            className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300"
          >
            <FaCalendarAlt />
            <span className="text-sm font-medium">
              {selectedDate.toDateString().slice(0, 10)}
            </span>
          </button>

          {/* INLINE CALENDAR POPUP */}
          {/* {open && (
            <div className="absolute right-[clamp(1rem,3vw,2rem)] mt-2 bg-white rounded-lg shadow-lg z-10">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setOpen(false);
                }}
                inline
              />
            </div>
          )} */}
        </div>
      </div>

      {/* =======================
          SECOND ROW - FILTERS + SORT
      ======================= */}
      <div className="flex flex-wrap justify-center sm:justify-end items-end gap-4 text-sm font-medium">

        {/* STATUS DROPDOWN */}
        <div className="flex flex-col text-left">
          <label className="text-xs text-white/70 mb-1">Status</label>
          <select
            value={filters?.status || ""}
            onChange={(e) => onFilter("status", e.target.value)}
            className="bg-white text-[#4a4a7d] rounded-lg px-3 py-2 border border-white/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7a7ce0]"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* PRIORITY DROPDOWN */}
        <div className="flex flex-col text-left">
          <label className="text-xs text-white/70 mb-1">Priority</label>
          <select
            value={filters?.priority || ""}
            onChange={(e) => onFilter("priority", e.target.value)}
            className="bg-white text-[#4a4a7d] rounded-lg px-3 py-2 border border-white/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7a7ce0]"
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* SORT DROPDOWN */}
        <div className="flex flex-col text-left">
          <label className="text-xs text-white/70 mb-1">Sort By</label>
          <select
            value={sortType || ""}
            onChange={(e) => onSort(e.target.value)}
            className="bg-white text-[#4a4a7d] rounded-lg px-3 py-2 border border-white/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7a7ce0]"
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
