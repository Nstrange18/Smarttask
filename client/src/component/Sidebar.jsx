import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      {/* HAMBURGER BUTTON (always visible) */}
      <button
        className={`
    fixed top-5 left-5 z-1000 p-2 rounded-xl border transition
    ${
      isDark
        ? "bg-black/30 backdrop-blur-md border-gray-600 text-gray-200"
        : "bg-[#F5F6FA] border-gray-300 text-gray-800"
    }
  `}
        onClick={toggleSidebar}
      >
        <Icon icon="mdi:menu" width={28} />
      </button>

      {/* SIDEBAR (same for all screens) */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-999
          w-45 p-4 flex flex-col justify-between
          transition-transform duration-300 ease-in-out

          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${isDark ? "bg-[#0B0E16] text-gray-200" : "bg-brand text-white"}
        `}
      >
        {/* TOP: LOGO + NAME */}
        <div>
          <div className="flex items-center gap-1 mb-8 border-b border-gray-600/30 pt-12">
            <img
              src="/smarttask-icon.png"
              width={50}
              className="rounded-full object-cover"
            />
            <span className="text-lg font-bold">smarttask</span>
          </div>

          {/* MENU LINKS */}
          <nav className="flex flex-col gap-6 items-center">
            <Link
              to="/"
              className="flex items-center gap-4 hover:scale-105 transition"
            >
              <Icon icon="mdi:home" width={24} />
              <span>Home</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-4 hover:scale-105 transition"
            >
              <Icon icon="mdi:user" width={24} />
              <span>Profile</span>
            </Link>
          </nav>
        </div>

        {/* BOTTOM: SETTINGS + LOGOUT */}
        <div className="flex flex-col gap-6 items-center pb-7">
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-4 hover:scale-105 transition"
          >
            <Icon icon="mdi:cog" width={24} />
            <span>Settings</span>
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="flex items-center gap-4 text-red-500 hover:scale-105 transition"
          >
            <Icon icon="mdi:logout" width={24} className="text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* OVERLAY (click to close) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-998"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
