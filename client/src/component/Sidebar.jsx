import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ setSidebarHover }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="group fixed top-0 bg-brand hover:w-50 transition-all duration-500 ease-in-out h-full w-20 p-4 z-100 rounded-tr-btn rounded-br-btn shadow-xl flex flex-col items-center"
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
        <div className="flex items-center justify-center">
          <img src="/smarttask-icon.png" alt="" width={70} />
          <h1
            className="text-[#362fa2] font-bold text-lg -mt-2
            opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ease-in-out
            invisible max-w-0 group-hover:max-w-full group-hover:visible"
          >
            smarttask
          </h1>
        </div>

        <div>
          <div className="mb-8 flex gap-2 items-center transition-all duration-300 cursor-pointer hover:scale-105">
            <Icon icon="mdi:home" width={25} className="text-white" />
            <Link to="/">
              <h1
                className="text-white
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out
                invisible max-w-0 group-hover:max-w-full group-hover:visible"
              >
                Home
              </h1>
            </Link>
          </div>

          <div className="mb-8 flex gap-2 items-center transition-all duration-300 cursor-pointer hover:scale-105">
            <Icon icon="mdi:user" width={25} className="text-white" />
            <Link to="/profile">
              <h1
                className="text-white
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out
                invisible max-w-0 group-hover:max-w-full group-hover:visible"
              >
                Profile
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="mt-auto pb-7"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        <div className="flex flex-col items-center cursor-pointer gap-1 hover:gap-2 transition-all duration-300">
          <Icon icon="mdi:logout" width={25} className="text-red-600" />
          <h1 className="text-red-600">Logout</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
 