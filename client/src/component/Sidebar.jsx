import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useTheme from "../hooks/useTheme";

const Sidebar = ({ setSidebarHover }) => {
  const [_hover, setHover] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`group fixed top-0  ${isDark ? "bg-[#0B0E16] text-gray-200" : "bg-brand text-white"} hover:w-50 transition-all duration-500 ease-in-out h-full w-20 p-4 z-100 rounded-tr-btn rounded-br-btn shadow-xl flex flex-col items-center`}
      onMouseEnter={() => {
        setHover(true);
        setSidebarHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
        setSidebarHover(false);
      }}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center justify-center border-b border-b-[gainsboro]">
          <img src="/smarttask-icon.png" alt="" width={70} />
          <h1
            className={`${isDark ? "text-gray-100" : "text-[#362fa2]"} font-bold text-lg -mt-2
            opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ease-in-out
            invisible max-w-0 group-hover:max-w-full group-hover:visible`}
          >
            smarttask
          </h1>
        </div>

        <div>
          <div className="mb-8 flex gap-2 items-center transition-all duration-300 cursor-pointer hover:scale-105">
            <Icon icon="mdi:home" width={25} className={`${isDark ? "text-gray-300" : "text-white"}`} />
            <Link to="/">
              <h1
                className={`${isDark ? "text-gray-300" : "text-white"}
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out
                invisible max-w-0 group-hover:max-w-full group-hover:visible`}
              > 
                Home
              </h1>
            </Link>
          </div>

          <div className="mb-8 flex gap-2 items-center transition-all duration-300 cursor-pointer hover:scale-105">
            <Icon icon="mdi:user" width={25} className={`${isDark ? "text-gray-300" : "text-white"}`} />
            <Link to="/profile">
              <h1
                className={`${isDark ? "text-gray-300" : "text-white"}
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out
                invisible max-w-0 group-hover:max-w-full group-hover:visible`}
              > 
                Profile
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-auto pb-7 flex flex-col gap-5">
        <div className="flex flex-col items-center cursor-pointer gap-1 hover:gap-2 transition-all duration-300" onClick={() => {
          navigate("/settings");
        }}>
          <Icon icon="mdi:cog" width={25} className={isDark ? "text-gray-400" : "text-[gainsboro]"} />
          <h1
            className={`${isDark ? "text-gray-300" : "text-[gainsboro]"}
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out
                invisible max-w-0 group-hover:max-w-full group-hover:visible`}
          >
            Settings
          </h1>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer gap-1 hover:gap-2 transition-all duration-300"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          <Icon icon="mdi:logout" width={25} className="text-red-600" />
          <h1
            className="text-red-600
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out
                invisible max-w-0 group-hover:max-w-full group-hover:visible"
          >
            Logout
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
